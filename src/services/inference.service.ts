import { InferenceApiService } from "./api.inference.service"

export const getInferenceServices = async () => {
    const url = "list"; // Make sure this matches the correct endpoint for listing
    const res = await InferenceApiService.get(url);
    return res.data; // Return the whole array of data
}


export const createInferenceService = async (npu_name:string) => {
    const url = 'create'; // Set the correct endpoint for creation
    const data = { npu_name }; // Construct the data object
    const res = await InferenceApiService.post(url, data); // Pass the data in the request
    return res.data;
}


export const deleteInferenceService = async (service_name:string) => {
    const url = `delete/${service_name}`; // Include the service_name in the URL
    const res = await InferenceApiService.delete(url);
    return res.data;
}
