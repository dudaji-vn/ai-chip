'use client';

import { GlobalLoading } from '@/components/shared/Loading';
import { store } from '@/stores'
import React from 'react'
import { Provider } from 'react-redux'

export default function AppProvider({ children } : { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <GlobalLoading />
            {children}           
        </Provider>
    )
}
