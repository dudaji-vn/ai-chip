import React from 'react'


interface Props {
    type?: 'primary' | 'secondary' | 'danger' | 'cancel',
    className?: string,
    children: React.ReactNode,
    [x: string]: any
}
export default function Button({ type = 'primary', className, children, ...props }: Props) {
    const types = {
        primary: 'bg-[#1A56DB] text-white rounded-sm px-5 py-[10px] text-sm leading-normal font-medium block hover:opacity-90 transition-all leading-none',
        secondary: 'w-full max-w-[320px] bg-white rounded-lg text-center p-4 text-gray-800 mx-auto text-base leading-normal font-semibold block hover:opacity-90 transition-all',
        danger: 'py-[10px] px-2 text-center bg-red-700 text-white text-sm border border-red-700 rounded-sm hover:opacity-90 transition-all leading-none',
        cancel: 'py-[10px] px-2 text-center bg-gray-600 text-sm text-gray-400 border border-gray-500 rounded-sm hover:opacity-90 transition-all leading-none'
    }
    return (
        <button className={`${types[type]} ${className}`} {...props}>{children}</button>
    )
}
