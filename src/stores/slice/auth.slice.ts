import { StoreName } from "@/core/enums/store.enum";
import { User } from "@/core/interfaces/user.interface";
import { createSlice } from "@reduxjs/toolkit";
import { loginService } from "@/services/auth.service";

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
                state.user = { id: action.payload.id, role: userRole};
                state.isAuthentication = true;
            })
        }
});

export const { logout } = authSlice.actions;

const AuthReducer = authSlice.reducer;
export default AuthReducer;
