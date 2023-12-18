import { StoreName } from "@/core/enums/store.enum";
import { User } from "@/core/interfaces/user.interface";
import { createSlice } from "@reduxjs/toolkit";
import { loginService } from "@/services/auth.service";
import { setLoading } from "./global.slice";
import { useDispatch } from "react-redux";

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
    reducers: {
        logout(state) {
            state.user = null;
            state.isAuthentication = false;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(loginService.fulfilled, (state, action) => {
                let userRole = action.payload.message == 'User logged in' ? 'user' : 'admin';
                state.user = { id: Math.random().toString(), role: userRole, email: action.payload.email};
                state.isAuthentication = true;
            })
        }
});

export const { logout } = authSlice.actions;

const AuthReducer = authSlice.reducer;
export default AuthReducer;
