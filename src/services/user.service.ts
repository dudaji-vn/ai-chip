import { ApiService } from "./api.service"

export const getUserService = async() => {
    const res = await ApiService.get('users');
    return res.data;
}
