export interface Npu {
    firmware_version: string;
    inference_count: number;
    memory_capacity: string;
    memory_utilization: string;
    npu_device_name: string;
    npu_id: string;
    npu_utilization: string;
    power_usage: string;
    server_id: string;
    server_ip: string;
    temperature: string;
    timestamp: string;
    user_id: string;
}

export interface Server {
    ai_chip_count: number;
    cpu_cores: string;
    cpu_utilization: string;
    gpu_count: number;
    gpu_utilization: string;
    gpus: string[];
    npus: Npu[];
    server_hostname: string;
    server_id: string;
    server_ip: string;
    server_role: string;
    server_status: string;
    timestamp: string;
    total_inference_count: number;
    user_id: string;
}

export interface Cluster {
    avg_cpu_utilization: string;
    avg_gpu_utilization: string;
    avg_npu_utilization: string;
    cluster_id: string;
    server_count: number;
    timestamp: string;
    total_cpu_cores: number;
    total_gpu_count: number;
    total_inference_count: number;
    total_npu_count: number;
    user_id: string;
    servers: Server[];
}