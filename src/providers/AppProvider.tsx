'use client';

import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';

import { GlobalLoading } from '@/components/shared/Loading';
import { persistor, store } from '@/stores'

export default function AppProvider({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <GlobalLoading />
                {children}
            </PersistGate>
        </Provider>
    )
}
