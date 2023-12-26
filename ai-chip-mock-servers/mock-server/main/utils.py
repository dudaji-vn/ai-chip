import logging as log
import os
from dotenv import load_dotenv
from datetime import datetime, timedelta
from logging.handlers import RotatingFileHandler
from influxdb_client import InfluxDBClient

# Load environment variables
load_dotenv()
# Use environment variables
TOKEN = os.getenv("TOKEN")
SERVER_URL = os.getenv("SERVER_URL")
client = InfluxDBClient(url=SERVER_URL, token=TOKEN, org="dudaji")
query_api = client.query_api()


def setup_logging():
    # Check if the app is running in a Docker container
    # DOCKER_ENV 환경 변수를 확인하여 도커 환경인지 판단
    in_docker = False
    if os.environ.get("DOCKER_ENV"):
        # 도커 환경일 경우, 스케줄러 실행
        in_docker = True

    # Set log file path based on the environment
    if in_docker:
        log_dir = "/app/logs"
        log_file_path = os.path.join(
            log_dir, "flask_app.log"
        )  # Path inside the container
    else:
        log_dir = "../logs"
        log_file_path = os.path.join(
            log_dir, "flask_app.log"
        )  # Path for local development

    # Create the log directory if it does not exist
    if not os.path.exists(log_dir):
        os.makedirs(log_dir)

    # Set up logging with RotatingFileHandler
    file_handler = RotatingFileHandler(log_file_path, maxBytes=10000, backupCount=1)
    file_handler.setLevel(log.INFO)
    return file_handler


def parse_time_params(request):
    start_time = request.args.get("start_time")
    end_time = request.args.get("end_time")

    # start_time과 end_time이 문자열인지 확인
    if start_time and not isinstance(start_time, str):
        log.error("Invalid time format: start_time must be a string")
        start_time = None

    if end_time and not isinstance(end_time, str):
        log.error("Invalid time format: end_time must be a string")
        end_time = None

    return start_time, end_time


def filter_data_by_time(data, start_time_str, end_time_str):
    # change str to time iso format
    if start_time_str:
        start_time = datetime.fromisoformat(start_time_str)
    else:
        start_time = None

    if end_time_str:
        end_time = datetime.fromisoformat(end_time_str)
    else:
        end_time = None

    # 시간 범위에 따라 데이터 필터링
    if start_time and end_time:
        return [
            item
            for item in data
            if start_time <= datetime.fromisoformat(item["timestamp"]) <= end_time
        ]
    else:
        return data


def determine_aggregation_window(start_time, end_time):
    """determine time window by input times"""
    start_datetime = datetime.fromisoformat(start_time)
    end_datetime = datetime.fromisoformat(end_time)
    duration = end_datetime - start_datetime
    print(f"time duration is : {duration}")
    if duration <= timedelta(minutes=1):
        return "10s"
    elif duration <= timedelta(hours=1):
        return "10m"
    elif duration <= timedelta(days=1):
        return "1h"
    else:
        return "1h"


def query_influxdb(start_time, end_time, metrics):
    window_period = determine_aggregation_window(start_time, end_time)
    print(f"window_period will be : {window_period}")
    start_time_iso = datetime.fromisoformat(start_time).astimezone().isoformat()
    end_time_iso = datetime.fromisoformat(end_time).astimezone().isoformat()

    flux_query = f"""
        from(bucket: "ai-chip")
        |> range(start: {start_time_iso}, stop: {end_time_iso})
        |> filter(fn: (r) => r["_measurement"] == "{metrics}")
        |> aggregateWindow(every: {window_period}, fn: mean, createEmpty: false)
    """
    results = query_api.query(flux_query)
    print(f"api_time_series_result: {len(results)}")
    return parse_time_series_flux(results, metrics=metrics)


def query_influxdb_latest(metrics):
    flux_query = f"""
        from(bucket: "ai-chip")
        |> range(start: -1m)  
        |> filter(fn: (r) => r["_measurement"] == "{metrics}")
        |> last() 
         
    """
    result = query_api.query(flux_query)
    print(f"api_latest_result: {len(result)}")
    return parse_flux_response(result, metrics=metrics)


def parse_time_series_flux(response, metrics):
    server_datas = []
    cluster_datas = []
    npu_datas = []

    server_data = {}
    cluster_data = {}
    npu_data = {}

    for table in response:
        for record in table.records:
            measurement = record.get_measurement()
            time = record.get_time().isoformat()
            field_name = record.get_field()
            value = record.get_value()

            # Server metrics parsing
            if measurement == "server_metrics":
                server_id = record.values.get("server_id")
                if server_id not in server_data:
                    server_data[server_id] = {
                        "server_id": server_id,
                        "time": time,
                        "cpu_utilization": None,
                        "memory_utilization": None,
                        "gpu_utilization": None,
                        "npu_utilization": None,
                    }
                server_data[server_id][field_name] = value
                if all(
                    metric is not None for metric in server_data[server_id].values()
                ):
                    print(f"all server data filled: {server_data[server_id]}")
                    server_datas.append(server_data[server_id])
                    server_data = {}  # Reset for next data point

            # Cluster metrics parsing
            elif measurement == "cluster_metrics":
                cluster_id = record.values.get("cluster_id")
                if cluster_id not in cluster_data:
                    cluster_data[cluster_id] = {
                        "cluster_id": cluster_id,
                        "time": time,
                        "avg_cpu_utilization": None,
                        "avg_gpu_utilization": None,
                        "avg_npu_utilization": None,
                    }
                cluster_data[cluster_id][field_name] = value
                if all(
                    metric is not None for metric in cluster_data[cluster_id].values()
                ):
                    print(f"all cluster data filled: {cluster_data[cluster_id]}")
                    cluster_datas.append(cluster_data[cluster_id])
                    cluster_data = {}  # Reset for next data point

            # NPU metrics parsing
            elif measurement == "npu_metrics":
                npu_id = record.values.get("npu_id")
                if npu_id not in npu_data:
                    npu_data[npu_id] = {
                        "npu_id": npu_id,
                        "time": time,
                        "memory_utilization": None,
                        "npu_utilization": None,
                        "power_usage": None,
                        "temperature": None,
                    }
                npu_data[npu_id][field_name] = value
                if all(metric is not None for metric in npu_data[npu_id].values()):
                    npu_datas.append(npu_data[npu_id])
                    npu_data = {}  # Reset for next data point

    print(
        f"clusters : {len(cluster_datas)}, servers: {len(server_datas)}, npus: {len(npu_datas)}"
    )

    # 필요한 데이터 반환
    if metrics == "server_metrics":
        return server_datas
    elif metrics == "cluster_metrics":
        return cluster_datas
    elif metrics == "npu_metrics":
        return npu_datas
    else:
        combined_data = server_datas + cluster_datas + npu_datas
        return combined_data


def parse_flux_response(response, metrics):
    server_data = {}
    cluster_data = {}
    npu_data = {}

    for table in response:
        for record in table.records:
            measurement = record.get_measurement()

            # Server metrics parsing
            if measurement == "server_metrics":
                server_id = record.values.get("server_id")
                server_field_name = record.values.get("_field")
                server_field_value = record.values.get("_value")
                if server_id not in server_data:
                    server_data[server_id] = {
                        "server_id": server_id,
                        "time": record.get_time().isoformat(),
                        "cpu_utilization": None,
                        "memory_utilization": None,
                        "gpu_utilization": None,
                        "npu_utilization": None,
                    }
                # print(server_data)
                # Update server-specific metrics
                if server_field_name in server_data[server_id]:
                    server_data[server_id][server_field_name] = server_field_value

            # Cluster metrics parsing
            elif measurement == "cluster_metrics":
                cluster_id = record.values.get("cluster_id")
                cluster_field_name = record.values.get("_field")
                cluster_field_value = record.values.get("_value")
                print(
                    f"cluster measure : {cluster_id}, {cluster_field_name}, {cluster_field_value}"
                )

                if cluster_id not in cluster_data:
                    cluster_data[cluster_id] = {
                        "cluster_id": cluster_id,
                        "time": record.get_time().isoformat(),
                        "avg_cpu_utilization": None,
                        "avg_gpu_utilization": None,
                        "avg_npu_utilization": None,
                    }

                # Update the specific metric for the cluster
                if cluster_field_name in cluster_data[cluster_id]:
                    cluster_data[cluster_id][cluster_field_name] = cluster_field_value

            elif measurement == "npu_metrics":
                npu_id = record.values.get("npu_id")
                if npu_id not in npu_data:
                    npu_data[npu_id] = {
                        "npu_id": npu_id,
                        "time": record.get_time().isoformat(),
                        "memory_utilization": None,
                        "npu_utilization": None,
                        "power_usage": None,
                        "temperature": None,
                    }
                npu_field_name = record.values.get("_field")
                npu_field_value = record.values.get("_value")
                if npu_field_name in npu_data[npu_id]:
                    npu_data[npu_id][npu_field_name] = npu_field_value

    # Convert data to lists
    server_list = list(server_data.values())
    cluster_list = list(cluster_data.values())
    npu_list = list(npu_data.values())

    # Return data based on the metric type
    if metrics == "server_metrics":
        return server_list
    elif metrics == "cluster_metrics":
        return cluster_list
    elif metrics == "npu_metrics":
        return npu_list
    else:
        # Combine lists if necessary, or handle other cases
        combined_data = server_list + cluster_list + npu_list
        return combined_data
