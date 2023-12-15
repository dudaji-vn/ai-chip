import { StoreName } from "@/core/enums/store.enum";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GlobalStoreType {
    isLoading: boolean;
    isOpenSidebar: boolean;
}

const initialState: GlobalStoreType = {
    isLoading: false,
    isOpenSidebar: false,
};

const globalSlice = createSlice({
    name: StoreName.GLOBAL_STORE,
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.isOpenSidebar = !state.isOpenSidebar;
        },
    },
});

export const {
    toggleSidebar
} = globalSlice.actions;

const GlobalReducer = globalSlice.reducer;
export default GlobalReducer;
