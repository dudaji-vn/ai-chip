import { createAsyncThunk } from "@reduxjs/toolkit"
import { ApiService } from "./api.service"

export const getUserList = createAsyncThunk('admin/getUserList', async (_, thunkAPI) => {
    const response = await ApiService.get('users')
    return response.data
})