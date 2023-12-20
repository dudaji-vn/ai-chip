import React from 'react'
import { twMerge } from 'tailwind-merge';
interface Props {
    status?: 'Ready' | 'Not Ready';
    className?: string;
}
export default function Status({ status, className }: Props) {
    const classesStatus = {
        'Ready': 'text-green-400 after:bg-green-400',
        'Not Ready': 'text-red-400 after:bg-red-400',
    }
    if(!status) return null;

    return (
        <span className={twMerge('text-green-400 after:bg-green-400 relative pl-4 after:content-[""] after:absolute after:top-[50%] after:left-0 after:translate-y-[-50%] after:w-2 after:h-2 after:rounded-full font-light flex items-center text-sm', classesStatus[status], className)}>{status}</span>
    )
}
