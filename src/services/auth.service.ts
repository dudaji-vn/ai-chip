import { createAsyncThunk } from "@reduxjs/toolkit"
import { ApiService } from "./api.service"
import { UserLogin } from "@/core/interfaces/user.interface"
import { changeCurrentUserId, setLoading } from "@/stores/slice/global.slice";

export const loginService = createAsyncThunk('auth/loginService', async (body: UserLogin | Omit<UserLogin, 'password'>, thunkAPI) => {
    try {
        thunkAPI.dispatch(setLoading(true))
        const response = await ApiService.post('auth/login', body)
        thunkAPI.dispatch(setLoading(false))
        thunkAPI.dispatch(changeCurrentUserId(body.id))
        let responseData = {
            ...response.data,
            email: body.id
        }
        return responseData;
    } catch (error: any) {
        thunkAPI.dispatch(setLoading(false))
        return thunkAPI.rejectWithValue(error.response.data)
    }
})