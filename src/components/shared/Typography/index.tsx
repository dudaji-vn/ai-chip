import React from 'react'


interface Props {
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p',
    size: 'xs' | 'sm' | 'md' | 'xl' | '2xl' | '4xl',
    className?: string,
    children: React.ReactNode,
    [x: string]: any
}
export default function Typography({ tag = 'p', size = 'md', className, children, ...props }: Props) {
    const Tag = tag as keyof JSX.IntrinsicElements
    const sizes = {
        'xs'    : 'text-xs',
        'sm'    : 'text-sm leading-5 text-gray-400',
        'md'    : 'text-base leading-normal text-gray-400',
        'xl'    : 'text-xl font-normal leading-normal text-gray-400',
        '2xl'   : 'text-2xl leading-normal font-medium',
        '4xl'   : 'text-4xl font-semibold leading-normal',
    }
    return (
        <Tag className={`${sizes[size]} ${className}`} {...props}>{children}</Tag>
    )
}
