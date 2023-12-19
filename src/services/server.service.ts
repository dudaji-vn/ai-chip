import { ApiService } from "./api.service"

export const getServersService = async(user_id: string | undefined) => {
    let url = "servers";
    if(user_id) url += `/user/${user_id}`;
    const res = await ApiService.get(url);
    return res.data;
}

export const getServerDetailService = async(server_id: string) => {
    const res = await ApiService.get(`servers/${server_id}`);
    return res.data;
}
