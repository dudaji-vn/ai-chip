import React from 'react'
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { TableColumn } from '@/core/interfaces/table-column.interface';
import { TrashIcon } from '@heroicons/react/24/solid';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { InformationCircleIcon } from '@heroicons/react/24/solid';

interface Props {
    dataSource?: any[];
    columns: TableColumn[];
    className?: string;
    isShowDeleteAction?: boolean;
    deleteAction?: (row: any) => void;
    isShowEditAction?: boolean;
    editAction?: (row: any) => void;
    isShowPopup?: boolean;
    popupAction?: (row: any) => void;
}
export default function Table({ 
    dataSource, 
    columns, 
    isShowDeleteAction, 
    deleteAction, 
    isShowEditAction, 
    editAction, 
    isShowPopup, 
    popupAction, 
    className 
}: Props) {

    const classesStatus = {
        'Ready': 'text-green-400 after:bg-green-400',
        'Not Ready': 'text-red-400 after:bg-red-400',
    }

    return (
        <table className={className}>
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
                {!dataSource && <tr><td colSpan={columns.length} className='text-center text-gray-400 text-sm'>No data</td></tr>}
                {dataSource && dataSource.length > 0 && dataSource.map((row, index) => (
                    <tr key={index} className='border-b border-gray-700 text-gray-400 text-sm'>
                        {columns.map((column) => (
                            <td key={column.field} className={twMerge('p-4')}>
                                {column.type === 'text' && 
                                    <p className={column.className}>{row[column.field]}</p>
                                }
                                {column && column.type === 'link' && column.link_field &&
                                    <Link href={column.link_field(row) || '/'} className={twMerge( 'hover:underline transition-all',column.className)}>{row[column.field]}</Link>
                                }
                                {column.type === 'length' && 
                                    <p className={column.className}>{row[column.field]?.length || 0}</p>
                                }
                                {column.type === 'status' && 
                                    <p className={twMerge('relative pl-4 after:content-[""] after:absolute after:top-[50%] after:left-0 after:translate-y-[-50%] after:w-2 after:h-2 after:rounded-full font-light', classesStatus[row[column.field] as keyof typeof classesStatus || ''],
                                    column.className)}>
                                        {row[column.field]}
                                    </p>
                                }
                                {column.type === 'action' &&
                                    <div className='flex gap-2 items-center justify-center'>
                                        {isShowPopup && popupAction && <InformationCircleIcon onClick={() => popupAction(row)} className='w-6 h-6 cursor-pointer text-gray-400 hover:text-white' />}
                                        {isShowEditAction && editAction && <PencilSquareIcon onClick={() => editAction(row)} className='w-6 h-6 cursor-pointer text-gray-400 hover:text-white' />}
                                        {isShowDeleteAction && deleteAction && <TrashIcon onClick={() => deleteAction(row)} className='w-6 h-6 cursor-pointer text-red-500 hover:text-red-400' />}
                                    </div>
                                }
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
