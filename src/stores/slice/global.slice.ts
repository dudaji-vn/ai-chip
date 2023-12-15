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
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        }
    },
});

export const {
    toggleSidebar,
    setLoading
} = globalSlice.actions;

const GlobalReducer = globalSlice.reducer;
export const GlobalSlice = globalSlice.caseReducers;
export default GlobalReducer;
