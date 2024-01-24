import { inferenceInstance } from "@/core/interceptors";

export const InferenceApiService = {
    request(config = {}) {
        return inferenceInstance.request(config);
    },

    get(url: string, config = {}) {
        return inferenceInstance.get(`${url}`, config);
    },

    delete(url: string, config = {}) {
        return inferenceInstance.delete(`${url}`, config);
    },

    head(url: string, config = {}) {
        return inferenceInstance.head(`${url}`, config);
    },

    options(url: string, config = {}) {
        return inferenceInstance.options(`${url}`, config);
    },

    post(url: string, data: any, config = {}) {
        return inferenceInstance.post(`${url}`, data, config);
    },

    put(url: string, data: any, config = {}) {
        return inferenceInstance.put(`${url}`, data, config);
    },

    patch(url: string, data: any, config = {}) {
        return inferenceInstance.patch(`${url}`, data, config);
    },
};
