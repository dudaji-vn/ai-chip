'use client'

import React, { useState } from 'react'
import { ChevronDownIcon, ClockIcon } from '@heroicons/react/24/solid'

import { useOnClickOutside } from '@/core/hooks/useOnClickOutside';
import { twMerge } from 'tailwind-merge';
import { SelectItem } from '@/core/interfaces';

interface Props {
    className?: string;
    label?: string;
    icon?: React.ReactNode;
    options: SelectItem[]
}

export function Select({ className, label, icon, options } : Props) {
    const [selected, setSelected] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    
    const toggleSelect = () => {
        setIsOpen(!isOpen);
    };
    const ref = useOnClickOutside(() => {
        setIsOpen(false);
    });
    const selectItem = (value: string) => () => {
        setSelected(value);
        setIsOpen(false);
    }
    return (
        <div className={twMerge('relative', className)} ref={ref}>
            <div className="flex cursor-pointer text-gray-400 gap-2 px-5 py-[10px] border border-gray-600 rounded-sm relative" onClick={toggleSelect}>
                {icon}
                <span className='flex-1 text-sm font-medium'>{selected || label}</span>
                <ChevronDownIcon className={twMerge('w-5 h-5 transition-all', isOpen? 'rotate-180' : '')} />
            </div>
            {isOpen && (
                <div className='absolute top-[calc(100%+5px)] left-0 w-full bg-gray-800 rounded-lg py-1 overflow-hidden'>
                    {options.map((option, index) => (
                        <div key={index} className='py-2 px-4 cursor-pointer hover:bg-gray-700 transition-all' onClick={selectItem(option.value)}>
                            <span className='text-sm text-gray-400'>{option.label}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
