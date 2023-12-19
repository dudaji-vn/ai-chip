import React from 'react'
import { twMerge } from 'tailwind-merge';
interface Props {
    className?: string;
}
export default function Skeleton({ className }: Props) {
    return (
        <div className={twMerge('animate-pulse w-full h-full bg-gray-700 rounded-sm', className)}>
        </div>
    )
}
