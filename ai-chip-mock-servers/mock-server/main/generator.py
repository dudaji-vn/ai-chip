import random
import os
from dotenv import load_dotenv
from datetime import datetime
from influxdb_client import InfluxDBClient, Point, WritePrecision
from influxdb_client.client.write_api import SYNCHRONOUS
from werkzeug.security import generate_password_hash

# Load environment variables
load_dotenv()
# Use environment variables
TOKEN = os.getenv("TOKEN")
SERVER_URL = os.getenv("SERVER_URL")
client = InfluxDBClient(url=SERVER_URL, token=TOKEN, org="dudaji")
write_api = client.write_api(write_options=SYNCHRONOUS)


class MockDataGenerator:
    def __init__(self, cluster_id, user_id):
        self.users = self.create_user_data()
        self.servers = []
        self.npus = []
        # clusters have to be initialzed at last
        self.clusters = []
        self.clusters.append(
            self.generate_cluster_metrics(cluster_id=cluster_id, user_id=user_id)
        )

    def create_user_data(self):
        users = [
            {
                "id": "admin@dudaji.com",
                "name": "demo-admin",
                "role": "Admin",
                "password_hash": generate_password_hash("Admin12345"),
                "profile_image": None,
            },
            {
                "id": "user@dudaji.com",
                "name": "demo-user",
                "role": "User",
                "password_hash": generate_password_hash("User12345"),
                "profile_image": None,
            },
            {
                "id": "ai-chip@gmail.com",
                "name": "ai-chip-user",
                "role": "User",
                "password_hash": generate_password_hash("User12345"),
                "profile_image": None,
            },
            {
                "id": "vinhtieng123@gmail.com",
                "name": "tieng",
                "role": "User",
                "password_hash": generate_password_hash("Tieng12345"),
                "profile_image": None,
            },
            {
                "id": "quochuy.truong1003@gmail.com",
                "name": "huy",
                "role": "User",
                "password_hash": generate_password_hash("Huy12345"),
                "profile_image": None,
            },
        ]
        return users

    def generate_cluster_metrics(self, cluster_id, user_id):
        _servers = [
            self.generate_server_metrics(server_id=i, user_id=user_id)
            for i in range(1, 9)
        ]  # 8 servers in a clusters
        self.servers = _servers

        total_cpu_cores = sum(int(server["cpu_cores"]) for server in _servers)
        total_gpu_count = sum(server["gpu_count"] for server in _servers)
        total_npu_count = sum(server["ai_chip_count"] for server in _servers)
        total_inference_count = sum(
            server["total_inference_count"] for server in _servers
        )
        avg_cpu_utilization = sum(
            float(server["cpu_utilization"]) for server in _servers
        ) / len(
            _servers
        )  # %
        avg_gpu_utilization = sum(
            float(server["gpu_utilization"]) for server in _servers
        ) / len(
            _servers
        )  # %
        avg_npu_utilization = sum(
            float(server["npu_utilization"]) for server in _servers
        ) / len(
            _servers
        )  # %

        return {
            "user_id": user_id,
            "cluster_id": cluster_id,
            "total_cpu_cores": total_cpu_cores,
            "total_gpu_count": total_gpu_count,
            "total_npu_count": total_npu_count,
            "total_inference_count": total_inference_count,
            "avg_cpu_utilization": avg_cpu_utilization,
            "avg_gpu_utilization": avg_gpu_utilization,
            "avg_npu_utilization": avg_npu_utilization,
            "server_count": len(_servers),
            "servers": _servers,
            "timestamp": datetime.now().isoformat(),
        }

    def generate_server_metrics(self, server_id, user_id):
        _server_ip = f"192.168.1.{server_id}"
        _npus = [
            self.generate_npu_metrics(
                npu_id=f"npu_{server_id}_0{i}",
                device_names=random.choice(
                    [
                        "SAPEON X220 Compact",
                        "SAPEON X220 Enterprise",
                        "SAPEON X330 Compact",
                        "SAPEON X330 Prime",
                    ]
                ),
                server_id=server_id,
                server_ip=_server_ip,
                user_id=user_id,
            )
            for i in range(1, 9)  # 8 NPUs per server
        ]
        self.npus.extend(_npus)

        _gpus = [
            {
                "gpu_name": f"RTX A5000_0{_}",
                "gpu_utilization": random.randint(0, 100),  # %
                "gpu_memory": 24,  # GB
            }
            for _ in range(8)  # 8 GPUs of type A5000 per server
        ]
        total_inference_count = sum(npu["inference_count"] for npu in _npus)
        cpu_utilization = random.randint(0, 100)  # %
        gpu_utilization = random.randint(0, 100)  # %
        npu_utilization = random.randint(0, 100)  # %
        memory_utilization = random.randint(0, 100)  # %

        return {
            "user_id": user_id,
            "server_id": f"{server_id}",
            "server_hostname": f"ai-chip-{server_id}",
            "server_ip": _server_ip,
            "server_status": "Ready",
            "server_role": "Worker",
            "cpu_cores": "128",
            "gpu_count": len(_gpus),
            "npus": _npus,
            "gpus": _gpus,
            "ai_chip_count": len(_npus),
            "memory": "256",  # GB
            "total_inference_count": total_inference_count,
            "cpu_utilization": cpu_utilization,
            "gpu_utilization": gpu_utilization,
            "npu_utilization": npu_utilization,
            "memory_utilization": memory_utilization,
            "timestamp": datetime.now().isoformat(),  # timestamp when generated this metrics
        }

    def generate_npu_metrics(self, npu_id, device_names, user_id, server_id, server_ip):
        npu_properties = {
            "SAPEON X220 Compact": {"memory_capacity": 8, "power_max": 65},
            "SAPEON X220 Enterprise": {"memory_capacity": 16, "power_max": 135},
            "SAPEON X330 Compact": {"memory_capacity": 16, "power_max": 120},
            "SAPEON X330 Prime": {"memory_capacity": 32, "power_max": 250},
        }

        properties = npu_properties.get(
            device_names, {"memory_capacity": 8, "power_max": 65}
        )

        return {
            "user_id": user_id,
            "npu_id": npu_id,
            "npu_device_name": device_names,
            "firmware_version": "1.0",
            "server_id": server_id,
            "server_ip": server_ip,
            "npu_utilization": random.randint(0, 100),  # %
            "memory_capacity": properties["memory_capacity"],  # GB
            "memory_utilization": random.randint(0, 100),  # %
            "power_usage": random.randint(0, properties["power_max"]),  # W
            "power_max": properties["power_max"],
            "temperature": random.randint(0, 80),  # °C
            "inference_count": random.randint(0, 1000),
            "timestamp": datetime.now().isoformat(),
        }

    def generate_updated_metrics(self):
        for server in self.servers:
            # Update server-wide metrics
            # print(f"is random working? {random.randint(0, 100)}")
            server["memory_utilization"] = random.randint(0, 100)  # %
            server["cpu_utilization"] = random.randint(0, 100)  # %

            # Update GPU utilization for each GPU in the server
            for gpu in server["gpus"]:
                gpu["gpu_utilization"] = random.randint(0, 100)  # %

            for npu in server["npus"]:
                npu["npu_utilization"] = random.randint(0, 100)  # %
                npu["memory_utilization"] = random.randint(0, 100)  # %
                npu["power_usage"] = random.randint(0, npu["power_max"])  # W
                npu["temperature"] = random.randint(0, 80)  # °C

    def update_cluster_metrics(self):
        for cluster in self.clusters:
            _servers = cluster["servers"]
            total_cpu_cores = sum(int(server["cpu_cores"]) for server in _servers)
            total_gpu_count = sum(server["gpu_count"] for server in _servers)
            total_npu_count = sum(server["ai_chip_count"] for server in _servers)
            total_inference_count = sum(
                server["total_inference_count"] for server in _servers
            )
            avg_cpu_utilization = sum(
                float(server["cpu_utilization"]) for server in _servers
            ) / len(
                _servers
            )  # %
            avg_gpu_utilization = sum(
                float(server["gpu_utilization"]) for server in _servers
            ) / len(
                _servers
            )  # %
            avg_npu_utilization = sum(
                float(server["npu_utilization"]) for server in _servers
            ) / len(
                _servers
            )  # %

            cluster.update(
                {
                    "total_cpu_cores": total_cpu_cores,
                    "total_gpu_count": total_gpu_count,
                    "total_npu_count": total_npu_count,
                    "total_inference_count": total_inference_count,
                    "avg_cpu_utilization": avg_cpu_utilization,
                    "avg_gpu_utilization": avg_gpu_utilization,
                    "avg_npu_utilization": avg_npu_utilization,
                    "timestamp": datetime.now().isoformat(),
                }
            )

    def write_data_to_influxdb(self):
        for server in self.servers:
            server_point = (
                Point("server_metrics")
                .tag("server_id", server["server_id"])
                .field("cpu_utilization", server["cpu_utilization"])
                .field("memory_utilization", server["memory_utilization"])
                .field("gpu_utilization", server["gpu_utilization"])
                .field("npu_utilization", server["npu_utilization"])
                # Add any other fields that you want to include
                .time(datetime.utcnow(), WritePrecision.NS)
            )
            write_api.write(bucket="ai-chip", org="dudaji", record=server_point)

            # If you want to write separate points for each NPU and GPU, you can loop through them as well
            for gpu in server["gpus"]:
                gpu_point = (
                    Point("gpu_metrics")
                    .tag("server_id", server["server_id"])
                    .tag("gpu_name", gpu["gpu_name"])
                    .field("gpu_utilization", gpu["gpu_utilization"])
                    .time(datetime.utcnow(), WritePrecision.NS)
                )
                write_api.write(bucket="ai-chip", org="dudaji", record=gpu_point)

            for npu in server["npus"]:
                npu_point = (
                    Point("npu_metrics")
                    .tag("server_id", server["server_id"])
                    .tag("npu_id", npu["npu_id"])
                    .field("npu_utilization", npu["npu_utilization"])
                    .field("memory_utilization", npu["memory_utilization"])
                    .field("power_usage", npu["power_usage"])
                    .field("temperature", npu["temperature"])
                    .time(datetime.utcnow(), WritePrecision.NS)
                )
                write_api.write(bucket="ai-chip", org="dudaji", record=npu_point)

        for cluster in self.clusters:
            cluster_point = (
                Point("cluster_metrics")
                .tag("cluster_id", cluster["cluster_id"])
                .field("avg_cpu_utilization", cluster["avg_cpu_utilization"])
                .field("avg_gpu_utilization", cluster["avg_gpu_utilization"])
                .field("avg_npu_utilization", cluster["avg_npu_utilization"])
                .time(cluster["timestamp"], WritePrecision.NS)
            )
            write_api.write(bucket="ai-chip", org="dudaji", record=cluster_point)


def create_inference_endpoint():
    pass


def increase_inference_count():
    pass


def create_minio_storage():
    pass
