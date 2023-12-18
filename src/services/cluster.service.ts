import { ApiService } from "./api.service"

export const getClusterService = async(user_id: string|undefined) => {
    let url = "clusters";
    if(user_id) {
        url = `clusters/user/${user_id}`;
    }
    const res = await ApiService.get(url);
    return res.data[0];
}
