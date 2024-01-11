'use client';

import React, { useEffect } from 'react'
import { Input, Select } from '@/components/shared/form1'
import Typography from '@/components/shared/typography1'
import { ClockIcon, PlusIcon } from '@heroicons/react/24/solid'
import Button from '@/components/shared/button1'
import { TableColumn } from '@/core/interfaces'
import Table from '@/components/shared/table1'
import { toast } from '@/services/toast.service'
import Modal from '@/components/shared/modal1';
import { InformationCircleIcon } from '@heroicons/react/24/solid';

const columns: TableColumn[] = [
    { header: 'Name', field: 'name', type: 'text' },
    { header: 'ai chip', field: 'ai_chip', type: 'text' },
    { header: 'model version', field: 'model_version', type: 'text' },
    { header: 'created at', field: 'created_at', type: 'text' },
    { header: '', field: 'cpu', type: 'action'},
]

export default function InterfaceEndpoint() {
    const [isOpenModalDelete, setIsOpenModalDelete] = React.useState(false);
    const [isOpenModalCreate, setIsOpenModalCreate] = React.useState(false);
    const toggleModalDelete = () => setIsOpenModalDelete(prev => !prev)
    const toggleModalCreate = () => setIsOpenModalCreate(prev => !prev)

    const deleteAction = (row: any) => {
        toast({ type: 'success', message: 'Delete success'})
        toggleModalDelete();
    }

    const tableDeleteAction = (row: any) => {
        toggleModalDelete();
    }
    

    return (
        <div>
            <div className='flex flex-col md:flex-row gap-2'>
                <Typography size='2xl' className='text-xl flex-1'>Inference endpoint</Typography>
                <Select 
                    className='w-full md:w-[200px]'
                    placeholder='Last modified'
                    icon={<ClockIcon className='w-5 h-5' />}
                    type='secondary'
                    options={[
                        { label: 'Item 1', value: 'item-1' },
                        { label: 'Item 2', value: 'item-2' },
                    ]}
                />
                <Button className='flex gap-2 items-center justify-center' onClick={toggleModalCreate}>
                    <span>New inference</span>
                    <PlusIcon className='w-5 h-5'></PlusIcon>
                </Button>
            </div>
            <Table
                className='w-full mt-4'
                columns={columns}
                dataSource={[
                    {name: 'test', ai_chip: 'test', model_version: 'test', created_at: 'test', cpu: 'test'},
                    {name: 'test1', ai_chip: 'test1', model_version: 'test1', created_at: 'test1', cpu: 'test1'},
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

            {/* Modal Create Endpoint */}
            <Modal isOpen={isOpenModalCreate} onClose={toggleModalCreate} title="New inference enpoint">
                <form action="" className='pt-6 flex flex-col gap-6'>
                    <Input 
                        label="Endpoint name"
                        placeholder='Input endpoint name'
                    />
                    <Select 
                        label='Select Ai Chip'
                        placeholder='Choose AI chip'
                        options={[
                            { label: 'Item 1', value: 'item-1' },
                            { label: 'Item 2', value: 'item-2' },
                        ]}
                    />
                    <Select 
                        label='Model version'
                        placeholder='Choose model version'
                        options={[
                            { label: 'Yolo', value: 'yolo' },
                            { label: 'Classification', value: 'classification' },
                        ]}
                    />
                    <div className='flex gap-4 -mx-6 px-6 border-t border-gray-700 pt-6'>
                        <Button className=''>Save</Button>
                        <Button className='' type='cancel_primary' onClick={toggleModalCreate}>Cancel</Button>
                    </div>
                </form>
            </Modal>

        </div>
    )
}
