import { combineReducers } from "@reduxjs/toolkit";
import AuthReducer from "./slice/auth.slice";
import GlobalReducer from "./slice/global.slice";

export const rootReducer = combineReducers({ 
    GlobalStore: GlobalReducer,
    AuthStore: AuthReducer,
})