import { StoreName } from "@/core/enums/store.enum";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GlobalStoreType {
    isLoading: boolean;
    isOpenSidebar: boolean;
    current_user_id: string;
}

const initialState: GlobalStoreType = {
    isLoading: false,
    isOpenSidebar: false,
    current_user_id: '',
};

const globalSlice = createSlice({
    name: StoreName.GLOBAL_STORE,
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.isOpenSidebar = !state.isOpenSidebar;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        changeCurrentUserId: (state, action: PayloadAction<string>) => {
            state.current_user_id = action.payload;
        }
    },
});

export const {
    toggleSidebar,
    setLoading,
    changeCurrentUserId,
} = globalSlice.actions;

const GlobalReducer = globalSlice.reducer;
export const GlobalSlice = globalSlice.caseReducers;
export default GlobalReducer;
