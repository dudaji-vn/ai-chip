import { createAsyncThunk } from "@reduxjs/toolkit"
import { ApiService } from "./api.service"
import { UserLogin } from "@/core/interfaces/user.interface"
import { setLoading } from "@/stores/slice/global.slice";

export const loginService = createAsyncThunk('auth/loginService', async (body: UserLogin, thunkAPI) => {
    try {
        thunkAPI.dispatch(setLoading(true))
        const response = await ApiService.post('auth/login', body)
        thunkAPI.dispatch(setLoading(false))
        return response.data
    } catch (error: any) {
        thunkAPI.dispatch(setLoading(false))
        return thunkAPI.rejectWithValue(error.response.data)
    }
})