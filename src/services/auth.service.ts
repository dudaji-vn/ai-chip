import { createAsyncThunk } from "@reduxjs/toolkit"
import { ApiService } from "./api.service"
import { UserLogin } from "@/core/interfaces/user.interface"

export const loginService = createAsyncThunk('auth/loginService', async (body: UserLogin, thunkAPI) => {
    const response = await ApiService.post('auth/login', body)
    return response.data
})