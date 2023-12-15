import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import GlobalReducer from './slice/global.slice';
import AuthReducer from './slice/auth.slice';


export const store = configureStore({
    reducer: {
        GlobalStore: GlobalReducer,
        AuthStore: AuthReducer,
    },
})

// Define types support for typescript
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;