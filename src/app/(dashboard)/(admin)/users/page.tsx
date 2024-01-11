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
import useUserApi from '@/core/hooks/api/use-user-api';
import Skeleton from '@/components/shared/skeleton1';
import { userColumn } from '@/core/column';

export default function UserPage() {
    const [isOpenModalDelete, setIsOpenModalDelete] = React.useState(false);
    const toggleModalDelete = () => setIsOpenModalDelete(prev => !prev)

    const { isLoading, isError, users } = useUserApi();

    const deleteAction = (row: any) => {
        toast({ type: 'success', message: 'Delete success'})
        toggleModalDelete();
    }

    const tableDeleteAction = (row: any) => {
        toggleModalDelete();
    }
    
    if(isLoading) return <UserPageSkeleton />

    return (
        <div>
            <div className='flex'>
                <Typography size='2xl' className='text-xl flex-1'>Users list</Typography>
                <Button className='flex gap-2 items-center'>
                    <span>New User</span>
                    <PlusIcon className='w-5 h-5'></PlusIcon>
                </Button>
            </div>
            <Table
                className='w-full mt-4'
                columns={userColumn}
                dataSource={users || []}
                isShowDeleteAction={true}
                isShowEditAction={true}
                editAction={(row) => {console.log(row)}}
                deleteAction={tableDeleteAction}
            ></Table>

            {/* Modal Delete User */}
            <Modal isOpen={isOpenModalDelete} onClose={toggleModalDelete} className='max-w-[360px]'>
                <div className='flex flex-col gap-4 py-4 items-center mb-10 pb-0'>
                    <InformationCircleIcon className='w-[42px] h-[42px] text-gray-400'></InformationCircleIcon>
                    <p className='text-gray-400 text-center'>Are you sure you want to delete this User ?</p>
                </div>
                <div className='flex item-center gap-4'>
                    <Button type='danger' className='flex-1' onClick={deleteAction}>Yes, I’m sure</Button>
                    <Button type='cancel' className='flex-1' onClick={toggleModalDelete}>No, cancel</Button>
                </div>
            </Modal>

        </div>
    )
}


const UserPageSkeleton = () => {
    return (
        <div>
            <div className='flex justify-between'>
                <Skeleton className='w-[200px] h-10'/>
                <Skeleton className='w-[200px] h-10'/>
            </div>
            <Skeleton className='h-80 mt-2'/>
        </div>
    )
}