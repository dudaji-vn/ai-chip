import React, { memo } from 'react'
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { TableColumn } from '@/core/interfaces/table-column.interface';
import { TrashIcon } from '@heroicons/react/24/solid';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Status from '../Status';

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
function Table({ 
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
                {/* Table Empty */}
                {/* {dataSource && <tr>
                    <td colSpan={columns.length} className='text-center p-12 flex flex-col gap-8 w-full'>
                        <div className='relative w-full max-w-[100px] min-h-[100px] h-auto mb-8'>
                            <Image
                                src='/images/folder.svg'
                                alt='Table Empty'
                                fill
                                priority
                            />
                        </div>
                        <div>
                            <p className='mb-2 text-center text-xl font-medium'>Empty data</p>
                            <p className='text-gray-400'>No data found</p>
                        </div>
                    </td>
                </tr>} */}

                {/* Table Not Empty */}
                {dataSource && dataSource.length > 0 && dataSource.map((row, index) => (
                    <tr key={index} className='border-b border-gray-700 text-gray-400 text-sm bg-gray-800'>
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
                                    <Status status={row[column.field]}></Status>
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

export default memo(Table)