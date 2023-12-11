import React from 'react'


interface Props {
    type?: 'primary' | 'secondary',
    className?: string,
    children: React.ReactNode,
    [x: string]: any
}
export default function Button({ type = 'primary', className, children, ...props }: Props) {
    const types = {
        primary    : 'w-full max-w-[320px] bg-white rounded-lg text-center p-4 text-gray-800 mx-auto text-base leading-normal font-semibold block hover:opacity-90 transition-all',
        secondary  : '',
    }
    return (
        <button className={`${types[type]} ${className}`} {...props}>{children}</button>
    )
}
