'use client'

import { BlockDataText, BlockDataWrapper } from '@/components/shared/BlockData'
import BlockColumnChart from '@/components/shared/BlockData/BlockColumnChart';
import BlockGaugeChart from '@/components/shared/BlockData/BlockGaugeChart';
import Table from '@/components/shared/Table'
import Series from '@/core/interfaces/series.interface';
import React from 'react'
import { Select } from '@/components/shared/Form';
import useClusterApi from '@/core/hooks/api/useClusterApi';
import { Loading } from '@/components/shared/Loading';
import { serverColumn } from '@/core/column';
import { useAppSelector } from '@/stores';
import Alert from '@/components/shared/Alert';
import Skeleton from '@/components/shared/Skeleton';
import ChartEmpty from '@/components/shared/ChartEmpty';

const chartSeries: Series[] = [
    { name: 'Net Profit', data: [44, 55, 57, 56, 61, 58, 63, 60, 66] },
    { name: 'Revenue', data: [76, 85, 101, 98, 87, 105, 91, 114, 94] },
    { name: 'Free Cash Flow', data: [35, 41, 36, 26, 45, 48, 52, 53, 41] },
    { name: 'Net Profit', data: [44, 55, 57, 56, 61, 58, 63, 60, 66] },
    { name: 'Revenue', data: [76, 85, 101, 98, 87, 105, 91, 114, 94] },
]
const chartColumn: string[] = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']

export default function ClusterOverview() {
    const current_user_id = useAppSelector(state => state.GlobalStore.current_user_id);
    const user_email = useAppSelector(state => state.AuthStore.user?.email);
    const { isLoading, cluster, isError } = useClusterApi(current_user_id || user_email || '')
    if(isLoading) return <ClusterOverviewSkeleton />
    if(isError) return <ChartEmpty />
    return (
        <div className='flex flex-col gap-2 pb-28'>
            {isError && <Alert type='error' message='This user do not have any cluster' />}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2'>
                <BlockDataWrapper title='Total CPU Cores'>
                    <BlockDataText data={cluster?.total_cpu_cores || '--'} unit='CPU'></BlockDataText>
                </BlockDataWrapper>
                <BlockDataWrapper title='Total GPU'>
                    <BlockDataText data={cluster?.total_gpu_count || '--'} unit="GPU"></BlockDataText>
                </BlockDataWrapper>
                <BlockDataWrapper title='Total NPU'>
                    <BlockDataText data={cluster?.total_npu_count || '--'} unit="NPU"></BlockDataText>
                </BlockDataWrapper>
                <BlockDataWrapper title='Total Inference count'>
                    <BlockDataText data={cluster?.total_inference_count || '--'}></BlockDataText>
                </BlockDataWrapper>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-2 '>
                <BlockDataWrapper title='Avg CPU Utilization'>
                    <BlockGaugeChart minValue={0} maxValue={100} value={parseFloat(cluster?.avg_cpu_utilization?.split('%')[0])} formatText={(value) => `${value || 0}%`}/>
                </BlockDataWrapper>
                <BlockDataWrapper title='Avg GPU Utilization'>
                    <BlockGaugeChart minValue={0} maxValue={100} value={parseFloat(cluster?.avg_gpu_utilization?.split('%')[0])} formatText={(value) => `${value || 0}%`}/>
                </BlockDataWrapper>
                <BlockDataWrapper title='Avg NPU Utilization'>
                    <BlockGaugeChart minValue={0} maxValue={100} value={parseFloat(cluster?.avg_npu_utilization?.split('%')[0])} formatText={(value) => `${value || 0}%`}/>
                </BlockDataWrapper>
            </div>
            <div className='grid grid-cols-1 gap-2 '>
                <BlockDataWrapper title='Total inference Count'>
                    <div className='flex justify-end w-full gap-2'>
                        <Select
                            type='secondary'
                            placeholder='Top 5 Services'
                            options={[
                                { label: 'Item 1', value: 'item-1' },
                                { label: 'Item 2', value: 'item-2' },
                            ]}
                        ></Select>
                    </div>
                    <BlockColumnChart chartSeries={chartSeries} chartColumns={chartColumn}/>
                </BlockDataWrapper>
            </div>
            <Table columns={serverColumn} dataSource={cluster?.servers}></Table>
        </div>
    )
}


const ClusterOverviewSkeleton = () => {
    return (
        <div className='flex flex-col gap-2 pb-28'>
            <Skeleton></Skeleton>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2'>
                <Skeleton className='h-[250px]'/>
                <Skeleton className='h-[250px]'/>
                <Skeleton className='h-[250px]'/>
                <Skeleton className='h-[250px]'/>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-2 '>
                <Skeleton className='h-[250px]'/>
                <Skeleton className='h-[250px]'/>
                <Skeleton className='h-[250px]'/>
            </div>
            <div className='grid grid-cols-1 gap-2 '>
                <Skeleton className='h-[250px]'/>
            </div>
        </div>
    )
}
