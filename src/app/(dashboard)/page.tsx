'use client'

import { BlockDataText, BlockDataWrapper } from '@/components/shared/block-data'
import BlockColumnChart from '@/components/shared/block-data/block-column-chart';
import BlockGaugeChart from '@/components/shared/block-data/block-gauge-chart';
import Table from '@/components/shared/table'
import Series from '@/core/interfaces/series.interface';
import React from 'react'
import { Select } from '@/components/shared/form';
import useClusterApi from '@/core/hooks/api/use-cluster-api';
import { serverColumn } from '@/core/column';
import { useAppSelector } from '@/stores';
import Skeleton from '@/components/shared/skeleton';
import ChartEmpty from '@/components/shared/chart-empty';
import { ClockIcon } from '@heroicons/react/24/outline';
import { intervalTime } from '@/core/constant';

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
    const user_id = useAppSelector(state => state.AuthStore.user?.id);
    const [timer, setTimer] = React.useState<number>(0);
    const { isLoading, cluster, isError } = useClusterApi(current_user_id || user_id || '', timer)
    
    if(isLoading) return <ClusterOverviewSkeleton />
    if(isError) return <ChartEmpty />

    const onChangeTimer = (value: string | number) => {
        setTimer(parseInt(value.toString()))
    }
    
    return (
        <div className='flex flex-col gap-2'>
            <div className='flex gap-2'>
                    <span className='px-5 py-[10px] rounded-sm border border-gray-600 text-blue-400 text-sm leading-none flex items-center justify-center capitalize'>{cluster?.cluster_id}</span>
                   <Select
                        type='secondary'
                        icon={<ClockIcon className='w-5 h-5' />}
                        placeholder='Timer'
                        options={intervalTime}
                        onChange={onChangeTimer}
                    ></Select>
                </div>
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
                    <BlockGaugeChart 
                        minValue={0} 
                        maxValue={100} 
                        value={cluster?.avg_cpu_utilization} 
                        formatText={(value) => `${value || 0}%`}
                    />
                </BlockDataWrapper>
                <BlockDataWrapper title='Avg GPU Utilization'>
                    <BlockGaugeChart 
                        minValue={0} 
                        maxValue={100} 
                        value={cluster?.avg_gpu_utilization} 
                        formatText={(value) => `${value || 0}%`}
                    />  
                </BlockDataWrapper>
                <BlockDataWrapper title='Avg NPU Utilization'>
                    <BlockGaugeChart 
                        minValue={0} 
                        maxValue={100} 
                        value={cluster?.avg_npu_utilization} 
                        formatText={(value) => `${value || 0}%`}
                    />
                </BlockDataWrapper>
            </div>
            <div className='grid grid-cols-1 gap-2'>
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
            <div className='w-full overflow-auto'>
                <Table columns={serverColumn} dataSource={cluster?.servers} className='w-full min-w-[700px]'></Table>
            </div>
        </div>
    )
}


const ClusterOverviewSkeleton = () => {
    return (
        <div className='flex flex-col gap-2 pb-28'>
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
