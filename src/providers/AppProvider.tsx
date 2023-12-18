'use client';

import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';

import { GlobalLoading } from '@/components/shared/Loading';
import { persistor, store } from '@/stores'
import queryClient from '@/configs/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';

export default function AppProvider({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <QueryClientProvider client={queryClient}>
                    <GlobalLoading />
                    {children}
                </QueryClientProvider>
            </PersistGate>
        </Provider>
    )
}
