import { ApiService } from "./api.service"

export const getNpusService = async(user_id: string | undefined) => {
    let url = "npus";
    if(user_id) url += `/user/${user_id}`;
    const res = await ApiService.get(url);
    return res.data;
}

export const getNpuDetailService = async(npu_id: string) => {
    const res = await ApiService.get(`npus/${npu_id}`);
    return res.data;
}
