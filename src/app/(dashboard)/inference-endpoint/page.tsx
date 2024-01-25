'use client';

import React, { useEffect, useState } from 'react'
import { Input, Select } from '@/components/shared/form'
import Typography from '@/components/shared/typography'
import { ClockIcon, PlusIcon } from '@heroicons/react/24/solid'
import Button from '@/components/shared/button'
import Table from '@/components/shared/table'
import { toast } from '@/services/toast.service'
import Modal from '@/components/shared/modal';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import useInferenceApi from '@/core/hooks/api/use-inference-endpoint-api';
import { InferenceApiService } from '@/services/api.inference.service';
import { inferenceEdnpointColumn } from '@/core/column/inference.column';



export default function InferenceEndpoint() {
    const [isOpenModalDelete, setIsOpenModalDelete] = React.useState(false);
    const [isOpenModalCreate, setIsOpenModalCreate] = React.useState(false);
    const toggleModalDelete = () => setIsOpenModalDelete(prev => !prev)
    const toggleModalCreate = () => setIsOpenModalCreate(prev => !prev)

    const [selectedChip, setSelectedChip] = useState('');
    const [endpointToDelete, setEndpointToDelete] = useState(null);

    const { isLoading, endpoints, isError, refetch } = useInferenceApi()
    // if(isLoading) return <EndpointOverviewSkeleton />
    // if(isError) return <ChartEmpty />

    const parseEndpointData = (endpoint:any) => {
        
        const parts = endpoint.split('/');
        const lastSegment = parts[parts.length - 2]; // Assuming the last segment is empty due to trailing slash
        const [chip, modelVersion] = lastSegment.split('-');
    
        // Format the current date and time
        const now = new Date();
        const created_at = now.toLocaleDateString('en-CA'); // 'en-CA' locale uses the YYYY-MM-DD format
    
        return {
            rawEndpoint: endpoint,
            endpoint: (
                <a href={`http://${endpoint}`} target="_blank" rel="noopener noreferrer">
                    {endpoint}
                </a>
            ),
            chip_type: chip,
            model_version: modelVersion+"-v2", // Adjust the logic based on actual format
            created_at: created_at // Set to the current datetime
        };
    };
    
    // Ensure endpoints is defined before mapping
    const endpointDataSource = endpoints ? endpoints.map(parseEndpointData) : [];

    const createAction = () => {
        let data = { "npu_name": selectedChip };
        InferenceApiService.post("create", data)
            .then(() => {
                toast({ type: 'success', message: 'Create success' });
                // Trigger a refetch or update the list here
                refetch()
            })
            .catch(/* handle error */)
            .finally(() => {
                toggleModalCreate();
            });
    };

    const deleteAction = () => {
        if (endpointToDelete) {
            InferenceApiService.delete(`delete/${endpointToDelete}`)
                .then(() => {
                    toast({ type: 'success', message: 'Delete success' });
                    // Additional logic to update the list, if necessary
                    refetch()
                })
                .catch((error) => {
                    toast({ type: 'error', message: 'Error deleting endpoint' });
                    // Handle error
                })
                .finally(() => {
                    setEndpointToDelete(null); // Reset the stored endpoint segment
                    toggleModalDelete(); // Close the modal
                });
        }
    };

    const tableDeleteAction = (row:any) => {
        const rawEndpoint = row.rawEndpoint;
        const urlParts = rawEndpoint.split('/');
        const lastSegment = urlParts[urlParts.length - 2];
        setEndpointToDelete(lastSegment); // Store the segment to delete
        toggleModalDelete(); // Open the modal
    };
    

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
                        { label: 'Chip Type', value: 'Chip-Type' },
                        { label: 'Recent Created', value: 'Recent-Created' },
                    ]}
                />
                <Button className='flex gap-2 items-center justify-center' onClick={toggleModalCreate}>
                    <span>New inference</span>
                    <PlusIcon className='w-5 h-5'></PlusIcon>
                </Button>
            </div>
            <Table
                className='w-full mt-4'
                columns={inferenceEdnpointColumn}
                dataSource={endpointDataSource}
                isShowDeleteAction={true}
                deleteAction={tableDeleteAction}
            ></Table>

            {/* Modal Delete Endpoint */}
            <Modal isOpen={isOpenModalDelete} onClose={toggleModalDelete} className='max-w-[360px]'>
                <div className='flex flex-col gap-4 py-4 items-center mb-10 pb-0'>
                    <InformationCircleIcon className='w-[42px] h-[42px] text-gray-400'></InformationCircleIcon>
                    <p className='text-gray-400 text-center'>Are you sure you want to delete this Endpoint ?</p>
                </div>
                <div className='flex item-center gap-4'>
                    <Button type='danger' className='flex-1' onClick={deleteAction}>Yes, I’m sure</Button>
                    <Button type='cancel' className='flex-1' onClick={toggleModalDelete}>No, cancel</Button>
                </div>
            </Modal>

            {/* Modal Create Endpoint */}
            <Modal isOpen={isOpenModalCreate} onClose={toggleModalCreate} title="New inference enpoint">
                <form action="" className='pt-6 flex flex-col gap-6'>
                    <Select 
                        label='Select Ai Chip'
                        placeholder='Choose AI chip'
                        options={[
                            { label: 'Sapeon', value: 'sapeon' },
                            { label: 'Furiosa', value: 'furiosa' },
                            { label: 'Cpu', value: 'cpu' },
                            { label: 'Gpu', value: 'gpu' },
                        ]}
                        onChange={setSelectedChip}
                    />
                    <Select 
                        label='Model Type'
                        placeholder='Choose model'
                        options={[
                            { label: 'ObjectDetection', value: 'objectdetection' },
                            { label: 'Classification', value: 'classification' },
                        ]}
                    />
                    <div className='flex gap-4 -mx-6 px-6 border-t border-gray-700 pt-6'>
                        <Button className='' onClick={createAction}>Save</Button>
                        <Button className='' type='cancel_primary' onClick={toggleModalCreate}>Cancel</Button>
                    </div>
                </form>
            </Modal>

        </div>
    )
}


