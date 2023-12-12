import { Columns } from '@/core/interfaces/Columns.interface';
import Link from 'next/link';
import React from 'react'
import { twMerge } from 'tailwind-merge';
interface Props {
    dataSource: any[];
    columns: Columns[];
}
export default function Table({ dataSource, columns }: Props) {

    const classesStatus = {
        'Ready': 'text-green-400 after:bg-green-400',
        'Not Ready': 'text-red-400 after:bg-red-400',
    }

    return (
        <table>
            <thead>
                <tr>
                    {columns.length > 0 && columns.map((column) => 
                        <th key={column.field} className={twMerge('p-4 text-xs text-gray-400 text-left font-semibold leading-normal uppercase bg-gray-700', column.classNameCol)}>
                            {column.header}
                        </th>
                    )}
                </tr>
            </thead>
            <tbody>
                {dataSource.length > 0 && dataSource.map((row, index) => (
                    <tr key={index} className='border-b border-gray-700 text-gray-400 text-sm'>
                        {columns.map((column) => (
                            <td key={column.field} className={twMerge('p-4')}>
                                {column.type === 'text' && 
                                    <p className={column.className}>{row[column.field]}</p>
                                }
                                {column.type === 'link' && 
                                    <Link href='/' className={twMerge( 'hover:underline transition-all',column.className)}>{row[column.field]}</Link>
                                }
                                {column.type === 'status' && 
                                    <p className={twMerge('relative pl-4 after:content-[""] after:absolute after:top-[50%] after:left-0 after:translate-y-[-50%] after:w-2 after:h-2 after:rounded-full font-light', classesStatus[row[column.field] as keyof typeof classesStatus || ''],
                                    column.className)}>
                                        {row[column.field]}
                                    </p>
                                }
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
