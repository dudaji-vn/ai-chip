import os
from dotenv import load_dotenv
import logging as log
from utils import (
    parse_time_params,
    filter_data_by_time,
    setup_logging,
    query_influxdb_latest,
    query_influxdb,
)
from copy import deepcopy
from flask import Flask, jsonify, request, Blueprint
from flask_cors import CORS
from werkzeug.security import check_password_hash
from generator import MockDataGenerator
from apscheduler.schedulers.background import BackgroundScheduler

# Load environment variables
load_dotenv()
# Use environment variables
TOKEN = os.getenv("TOKEN")
SERVER_URL = os.getenv("SERVER_URL")
log.info("check env injection :%s", SERVER_URL)

# Create a Blueprint for version 1 of your API
api_v1 = Blueprint("api_v1", __name__, url_prefix="/api/v1")
# Assuming clusters, servers, and npus are defined as follows:
generator = MockDataGenerator(
    cluster_id="ai-chip-cluster-01", user_id="ai-chip@gmail.com"
)
users = generator.users
clusters = generator.clusters
servers = generator.servers
npus = generator.npus


# Feature 1: User API
@api_v1.route("/users", methods=["GET"])
def get_users():
    return jsonify(users)


@api_v1.route("/auth/login", methods=["POST"])
def login():
    data = request.json
    user_id = data.get("id")
    password = data.get("password")

    # Iterate over the users list to find the user
    user = next((user for user in users if user["id"] == user_id), None)

    if user:
        # Check for 'Admin' role and validate both ID and password
        if user["role"] == "Admin":
            if check_password_hash(user["password_hash"], password):
                return jsonify({"message": "Admin logged in"})
            else:
                return jsonify({"message": "Invalid password"}), 40

        # Check for 'User' role and validate only ID
        elif user["role"] == "User":
            return jsonify({"message": "User logged in"})

        else:
            # Handle other roles or unexpected conditions
            return jsonify({"message": "Access denied"}), 401

    else:
        # User does not exist
        return jsonify({"message": "User not found"}), 404


@api_v1.route("/users", methods=["POST"])
def create_user():
    # Implement user creation logic
    return jsonify({"message": "User created"})


@api_v1.route("/users/<user_id>", methods=["DELETE"])
def delete_user(user_id):
    # Implement user deletion logic
    return jsonify({"message": f"User {user_id} deleted"})


# Feature 2,3: System Information Dashboard
# get all clusters
# @api_v1.route("/clusters", methods=["GET"])
# def get_all_clusters():
#     return jsonify(clusters)


@api_v1.route("/clusters", methods=["GET"])
def get_all_clusters():
    start_time, end_time = parse_time_params(request)
    updated_clusters = update_cluster_data(deepcopy(clusters), start_time, end_time)
    # filtered_clusters = filter_data_by_time(updated_clusters, start_time, end_time)
    print(len(updated_clusters))
    return jsonify(updated_clusters)


@api_v1.route("/clusters/<cluster_id>", methods=["GET"])
def get_cluster_by_id(cluster_id):
    start_time, end_time = parse_time_params(request)
    selected_cluster = next(
        (item for item in clusters if item["cluster_id"] == cluster_id), None
    )
    if selected_cluster:
        updated_cluster = update_cluster_data(
            [deepcopy(selected_cluster)], start_time, end_time
        )[0]
        return jsonify(updated_cluster)
    else:
        return jsonify({"message": "Cluster not found"}), 404


@api_v1.route("/clusters/user/<user_id>", methods=["GET"])
def get_clusters_by_user(user_id):
    start_time, end_time = parse_time_params(request)
    user_clusters = [cluster for cluster in clusters if cluster["user_id"] == user_id]
    updated_clusters = update_cluster_data(
        deepcopy(user_clusters), start_time, end_time
    )
    # filtered_clusters = filter_data_by_time(updated_clusters, start_time, end_time)
    return jsonify(updated_clusters)


@api_v1.route("/servers", methods=["GET"])
def get_all_servers():
    start_time, end_time = parse_time_params(request)
    current_servers = deepcopy(servers)
    updated_servers = update_server_data(current_servers, start_time, end_time)
    # filtered_servers = filter_data_by_time(updated_servers, start_time, end_time)
    return jsonify(updated_servers)


@api_v1.route("/servers/<server_id>", methods=["GET"])
def get_server_by_id(server_id):
    server = next((item for item in servers if item["server_id"] == server_id), None)
    if server:
        updated_server = update_server_data([deepcopy(server)], None, None)[0]
        return jsonify(updated_server)
    else:
        return jsonify({"message": "Server not found"}), 404


@api_v1.route("/servers/user/<user_id>", methods=["GET"])
def get_servers_by_user(user_id):
    user_servers = [server for server in servers if server["user_id"] == user_id]
    updated_servers = update_server_data(deepcopy(user_servers), None, None)
    return jsonify(updated_servers)


# get all npus
@api_v1.route("/npus", methods=["GET"])
def get_all_npus():
    start_time, end_time = parse_time_params(request)
    current_npus = deepcopy(npus)
    updated_npus = update_npu_data(current_npus, start_time, end_time)
    # filtered_npus = filter_data_by_time(updated_npus, start_time, end_time)
    return jsonify(updated_npus)


# get npu by npu id
@api_v1.route("/npus/<npu_id>", methods=["GET"])
def get_npu_by_id(npu_id):
    npu = next((item for item in npus if item["npu_id"] == npu_id), None)
    if npu:
        updated_npu = update_npu_data([deepcopy(npu)], None, None)[0]
        return jsonify(updated_npu)
    else:
        return jsonify({"message": "NPU not found"}), 404


# get npu by user id
@api_v1.route("/npus/user/<user_id>", methods=["GET"])
def get_npus_by_user(user_id):
    user_npus = [npu for npu in npus if npu["user_id"] == user_id]
    updated_npus = update_npu_data(deepcopy(user_npus), None, None)
    return jsonify(updated_npus)


app = Flask(__name__)
# Register the Blueprint with the app
app.register_blueprint(api_v1)
cors = CORS(
    app,
    resources={
        r"/api/*": {
            "origins": [
                "http://localhost:3000",
                "https://test-ai-chip.onrender.com",
                "https://ai-chip.onrender.com",
            ],
            "methods": ["GET", "POST", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"],
        }
    },
)


def update_cluster_data(clusters, start_time, end_time):
    influxdb_clusters = (
        query_influxdb(start_time, end_time, "cluster_metrics")
        if start_time and end_time
        else query_influxdb_latest("cluster_metrics")
    )
    influxdb_servers = (
        query_influxdb(start_time, end_time, "server_metrics")
        if start_time and end_time
        else query_influxdb_latest("server_metrics")
    )
    influxdb_npus = (
        query_influxdb(start_time, end_time, "npu_metrics")
        if start_time and end_time
        else query_influxdb_latest("npu_metrics")
    )

    for cluster in clusters:
        cluster_id = cluster["cluster_id"]
        cluster_metrics = next(
            (item for item in influxdb_clusters if item["cluster_id"] == cluster_id),
            None,
        )
        if cluster_metrics:
            cluster.update(
                {
                    "avg_cpu_utilization": cluster_metrics.get("avg_cpu_utilization"),
                    "avg_gpu_utilization": cluster_metrics.get("avg_gpu_utilization"),
                    "avg_npu_utilization": cluster_metrics.get("avg_npu_utilization"),
                }
            )
        for server in cluster["servers"]:
            server_id = server["server_id"]
            server_metrics = next(
                (item for item in influxdb_servers if item["server_id"] == server_id),
                None,
            )
            if server_metrics:
                server.update(server_metrics)

            for npu in server["npus"]:
                npu_id = npu["npu_id"]
                npu_metrics = next(
                    (item for item in influxdb_npus if item["npu_id"] == npu_id), None
                )
                if npu_metrics:
                    npu.update(npu_metrics)

    return clusters


def update_server_data(servers, start_time, end_time):
    influxdb_servers = (
        query_influxdb(start_time, end_time, "server_metrics")
        if start_time and end_time
        else query_influxdb_latest("server_metrics")
    )
    influxdb_npus = (
        query_influxdb(start_time, end_time, "npu_metrics")
        if start_time and end_time
        else query_influxdb_latest("npu_metrics")
    )

    for server in servers:
        server_id = server["server_id"]
        server_metrics = next(
            (item for item in influxdb_servers if item["server_id"] == server_id),
            None,
        )
        if server_metrics:
            server.update(server_metrics)

        for npu in server.get("npus", []):
            npu_id = npu["npu_id"]
            npu_metrics = next(
                (item for item in influxdb_npus if item["npu_id"] == npu_id), None
            )
            if npu_metrics:
                npu.update(npu_metrics)

    return servers


def update_npu_data(npus, start_time, end_time):
    influxdb_npus = (
        query_influxdb(start_time, end_time, "npu_metrics")
        if start_time and end_time
        else query_influxdb_latest("npu_metrics")
    )

    for npu in npus:
        npu_id = npu["npu_id"]
        npu_metrics = next(
            (item for item in influxdb_npus if item["npu_id"] == npu_id), None
        )
        if npu_metrics:
            npu.update(npu_metrics)

    return npus


def update_metrics():
    log.info("Writing to InfluxDB every 30 seconds")
    generator.generate_updated_metrics()  # Update server and NPU metrics
    generator.update_cluster_metrics()  # Update cluster metrics
    generator.write_data_to_influxdb()


scheduler = BackgroundScheduler()
scheduler.add_job(update_metrics, "interval", seconds=30)
# scheduler.start()


if __name__ == "__main__":
    file_handler = setup_logging()
    app.logger.addHandler(file_handler)

    # DOCKER_ENV 환경 변수를 확인하여 도커 환경인지 판단
    if os.environ.get("DOCKER_ENV"):
        # 도커 환경일 경우, 스케줄러 실행
        scheduler.start()
    try:
        app.run(host="0.0.0.0", port=5556, debug=True)
    finally:
        # 스케줄러 중단
        if os.environ.get("DOCKER_ENV"):
            scheduler.shutdown()
