import React from 'react'
import { twMerge } from 'tailwind-merge';
interface Props {
    type?: 'success' | 'error' | 'warning' | 'info';
    message: string | null;
    className?: string;
}
export default function Alert({ type = 'error', message, className } : Props) {
    if(!message) return null
    const classes = {
        'error': 'text-red-500 border-red-900 bg-red-900/10',
        'success': 'text-green-500 border-green-900 bg-green-900/10',
        'warning': 'text-yellow-500 border-yellow-900 bg-yellow-900/10',
        'info': 'text-blue-500 border-blue-900 bg-blue-900/10',
    }
    return (
        <p className={twMerge('p-4 rounded-lg border text-sm font-normal', classes[type], className)}>
            {message}
        </p>
    )
}
