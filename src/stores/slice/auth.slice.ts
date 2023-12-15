import { StoreName } from "@/core/enums/store.enum";
import { User } from "@/core/interfaces/user.interface";
import { createSlice } from "@reduxjs/toolkit";
import { loginService } from "@/services/auth.service";
import { getUserList } from "@/services/user.service";

interface AuthStoreType {
    isLoading: boolean;
    user: User | null;
    isAuthentication: boolean;
}

const initialState: AuthStoreType = {
    isLoading: false,
    user: null,
    isAuthentication: false,
};

const authSlice = createSlice({
    name: StoreName.AUTH_STORE,
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(loginService.fulfilled, (state, action) => {
                let userRole = action.payload == 'User logged in' ? 'user' : 'admin';
                state.isLoading = false;
                state.user = { id: Math.random().toString(), role: userRole};
                state.isAuthentication = true;
            })
            .addCase(loginService.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginService.rejected, (state) => {
                state.isLoading = false;
            })
        }
});

export const { } = authSlice.actions;

const AuthReducer = authSlice.reducer;
export default AuthReducer;
