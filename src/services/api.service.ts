import { instance } from "@/core/interceptors";

export const ApiService = {
    request(config = {}) {
        return instance.request(config);
    },

    get(url: string, config = {}) {
        return instance.get(`${url}`, config);
    },

    delete(url: string, config = {}) {
        return instance.delete(`${url}`, config);
    },

    head(url: string, config = {}) {
        return instance.head(`${url}`, config);
    },

    options(url: string, config = {}) {
        return instance.options(`${url}`, config);
    },

    post(url: string, data: any, config = {}) {
        return instance.post(`${url}`, data, config);
    },

    put(url: string, data: any, config = {}) {
        return instance.put(`${url}`, data, config);
    },

    patch(url: string, data: any, config = {}) {
        return instance.patch(`${url}`, data, config);
    },
};
