import { ApiService } from "./api.service"

export const getClustersService = async(user_id: string | undefined) => {
    let url = "clusters";
    if(user_id) url += `/user/${user_id}`;
    const res = await ApiService.get(url);
    return res.data[0];
}
