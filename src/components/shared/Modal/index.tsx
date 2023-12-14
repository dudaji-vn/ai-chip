import { XMarkIcon } from '@heroicons/react/24/solid'
import React, { Fragment } from 'react'
import { twMerge } from 'tailwind-merge';

interface Props {
    title?: string;
    className?: string;
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export default function Modal({ title, isOpen, onClose, className, children } : Props) {
    return (
        <Fragment>
            <div  onClick={onClose} className={twMerge('fixed inset-0 bg-gray-600/60 z-20 transition-all', isOpen ? 'opacity-100 cursor-pointer' : 'pointer-events-none opacity-0 ')} ></div>
            <div className={twMerge('fixed top-[50%] max-w-[640px] w-[95%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-30 bg-gray-800 p-6 transition',
                isOpen ? 'opacity-100' : 'pointer-events-none opacity-0 -translate-y-1/3', className )}>
                <div className='flex justify-end items-center'>
                    <span className='flex-1 text-white font-semibold text-lg'>{title}</span>
                    <XMarkIcon className='w-5 h-5 text-gray-400 cursor-pointer hover:text-white' onClick={onClose}/>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </Fragment>
    )
}
