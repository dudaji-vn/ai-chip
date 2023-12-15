'use client';

import React, { useEffect } from 'react'
import { Input, Select } from '@/components/shared/Form/'
import Typography from '@/components/shared/Typography'
import { ClockIcon, PlusIcon } from '@heroicons/react/24/solid'
import Button from '@/components/shared/Button'
import { TableColumn } from '@/core/interfaces'
import Table from '@/components/shared/Table'
import { toast } from '@/services/toast.service'
import Modal from '@/components/shared/Modal';
import { InformationCircleIcon } from '@heroicons/react/24/solid';

const columns: TableColumn[] = [
    { header: 'UserId', field: 'user_id', type: 'text' },
    { header: 'type', field: 'type', type: 'text' },
    { header: 'created at', field: 'created_at', type: 'text' },
    { header: '', field: '', type: 'action'},
]

export default function Storage() {
    const [isOpenModalDelete, setIsOpenModalDelete] = React.useState(false);
    const toggleModalDelete = () => setIsOpenModalDelete(prev => !prev)

    const deleteAction = (row: any) => {
        toast({ type: 'success', message: 'Delete success'})
        toggleModalDelete();
    }

    const tableDeleteAction = (row: any) => {
        toggleModalDelete();
    }
    

    return (
        <div>
            <div className='flex'>
                <Typography size='2xl' className='text-xl flex-1'>Storage</Typography>
                <Select 
                    className='w-[200px] mr-2'
                    placeholder='Last modified'
                    icon={<ClockIcon className='w-5 h-5' />}
                    type='secondary'
                    options={[
                        { label: 'Item 1', value: 'item-1' },
                        { label: 'Item 2', value: 'item-2' },
                    ]}
                />
                <Button className='flex gap-2 items-center'>
                    <span>New Storage</span>
                    <PlusIcon className='w-5 h-5'></PlusIcon>
                </Button>
            </div>
            <Table
                className='w-full mt-4'
                columns={columns}
                dataSource={[
                    {user_id: 'test', type: 'test', created_at: 'test', cpu: 'test'},
                ]}
                isShowDeleteAction={true}
                deleteAction={tableDeleteAction}
            ></Table>

            {/* Modal Delete Endpoint */}
            <Modal isOpen={isOpenModalDelete} onClose={toggleModalDelete} className='max-w-[360px]'>
                <div className='flex flex-col gap-4 py-4 items-center mb-10 pb-0'>
                    <InformationCircleIcon className='w-[42px] h-[42px] text-gray-400'></InformationCircleIcon>
                    <p className='text-gray-400 text-center'>Are you sure you want to delete this Storage ?</p>
                </div>
                <div className='flex item-center gap-4'>
                    <Button type='danger' className='flex-1' onClick={deleteAction}>Yes, I’m sure</Button>
                    <Button type='cancel' className='flex-1' onClick={toggleModalDelete}>No, cancel</Button>
                </div>
            </Modal>

        </div>
    )
}
