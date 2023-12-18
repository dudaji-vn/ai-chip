'use client'

import React, { useState } from 'react'
import { ChevronDownIcon, ClockIcon } from '@heroicons/react/24/solid'

import { useOnClickOutside } from '@/core/hooks/useOnClickOutside';
import { twMerge } from 'tailwind-merge';
import { SelectItem } from '@/core/interfaces';

interface Props {
    className?: string;
    label?: string;
    placeholder?: string;
    icon?: React.ReactNode;
    options: SelectItem[],
    type?: 'primary' | 'secondary',
    onChange?: (value: any) => void;
}

export function Select({ className, label, placeholder, icon, options, type =  'primary', onChange } : Props) {
    const [selected, setSelected] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    
    const toggleSelect = () => {
        setIsOpen(!isOpen);
    };
    const ref = useOnClickOutside(() => {
        setIsOpen(false);
    });
    const selectItem = (value: string) => () => {
        let label = options.find(option => option.value === value)?.label || null;
        setSelected(label);
        setIsOpen(false);
        if(onChange) {
            onChange(value);
        }
    }

    const types = {
        primary: 'flex cursor-pointer text-gray-400 gap-2 p-3 border border-gray-600 rounded-sm relative',
        secondary: 'flex cursor-pointer text-gray-400 gap-2 p-3 border border-gray-600 rounded-sm relative'
    }

    return (
        <div className={twMerge('relative', className)} ref={ref}>
            {label && <label className='block mb-2 text-sm font-medium'>{label}</label>}
            <div className={types[type]} onClick={toggleSelect}>
                {icon}
                <span className='flex-1 text-sm font-medium'>{selected || placeholder}</span>
                <ChevronDownIcon className={twMerge('w-5 h-5 transition-all', isOpen? 'rotate-180' : '')} />
            </div>
            {isOpen && (
                <div className='absolute top-[calc(100%+5px)] left-0 w-full bg-gray-800 rounded-lg py-1 overflow-y-auto max-h-52 z-20 shadow-xl'>
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
