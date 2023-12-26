'use client'

import { BlockDataText, BlockDataWrapper } from '@/components/shared/BlockData'
import BlockColumnChart from '@/components/shared/BlockData/BlockColumnChart';
import BlockGaugeChart from '@/components/shared/BlockData/BlockGaugeChart';
import BlockLineChart from '@/components/shared/BlockData/BlockLineChart';
import Table from '@/components/shared/Table'
import { TableColumn } from '@/core/interfaces/table-column.interface';
import Series from '@/core/interfaces/series.interface';
import React, { Fragment, memo, useCallback, useEffect } from 'react'
import { Select } from '@/components/shared/Form';
import { ClockIcon } from '@heroicons/react/24/solid';
import { useAppDispatch, useAppSelector } from '@/stores';
import useServerDetailApi from '@/core/hooks/api/useServerDetailApi';
import useClusterApi from '@/core/hooks/api/useClusterApi';
import { changeCurrentUserId } from '@/stores/slice/global.slice';
import Status from '@/components/shared/Status';
import splitNumberAndCharacter from '@/utils/splitNumberAndCharacter';
import { gpuColumn, npuColumn } from '@/core/column';
import Skeleton from '@/components/shared/Skeleton';
import { useRouter } from 'next/navigation';
import ChartEmpty from '@/components/shared/ChartEmpty';
import { intervalTime } from '@/core/constant';

const chartSeries: Series[] = [
    { name: 'Net Profit', data: [44, 55, 57, 56, 61, 58, 63, 60, 66] },
    { name: 'Revenue', data: [76, 85, 101, 98, 87, 105, 91, 114, 94] },
    { name: 'Free Cash Flow', data: [35, 41, 36, 26, 45, 48, 52, 53, 41] },
    { name: 'Net Profit', data: [44, 55, 57, 56, 61, 58, 63, 60, 66] },
    { name: 'Revenue', data: [76, 85, 101, 98, 87, 105, 91, 114, 94] },
]
const chartColumn: string[] = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']

function Server({ params }: { params: { serverId: string } }) {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const current_user_id = useAppSelector<string>(state => state.GlobalStore.current_user_id);
    const user_id = useAppSelector<string | undefined>(state => state.AuthStore.user?.id);
    const [timer, setTimer] = React.useState<number>(0);

    let serverId = params?.serverId || '';

    const { isLoading, server, isError } = useServerDetailApi(serverId || '', timer)
    const { isLoading: isLoadingCluster, cluster, isError: isErrorCluster } = useClusterApi(current_user_id || user_id || '')
    const serverList = cluster?.servers?.map((server: any) => ({ label: server.server_ip, value: server.server_id })) || []

    const handleChangeServer = useCallback((value: string) => {
        if (!value) return;
        router.push(`/server/${value}`)
    }, [router])

    useEffect(() => {
        if (server && server.user_id && current_user_id !== server.user_id) {
            dispatch(changeCurrentUserId(server.user_id))
        }
    }, [current_user_id, dispatch, server])

    const onChangeTimer = (value: string | number) => {
        setTimer(parseInt(value.toString()))
    }

    return (
        <div className='flex flex-col gap-2'>
            {isLoadingCluster && <ServerHeadSkeleton />}
            {!isLoadingCluster && !isErrorCluster && 
                <div className='flex gap-2'>
                    <span className='px-5 py-[10px] rounded-sm border border-gray-600 text-blue-400 text-sm leading-none flex items-center justify-center'>Server IP</span>
                    <Select
                        className='w-[346px]'
                        type='secondary'
                        placeholder={server?.server_ip || 'Select server IP'}
                        options={serverList}
                        onChange={handleChangeServer}
                    ></Select>
                   <Select
                        type='secondary'
                        icon={<ClockIcon className='w-5 h-5' />}
                        placeholder='Timer'
                        options={intervalTime}
                        onChange={onChangeTimer}
                    ></Select>
                    <Status status={server?.server_status} />
                </div>
            }

            {isLoading && <ServerBodySkeleton />}
            {!isLoading && !isError &&
                <Fragment>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2'>
                        <BlockDataWrapper title='CPU Cores'>
                            <BlockDataText data={server?.cpu_cores} unit='CPUs' />
                        </BlockDataWrapper>
                        <BlockDataWrapper title='Total GPU'>
                            <BlockDataText data={server?.gpu_count} unit='GPU' />
                        </BlockDataWrapper>
                        <BlockDataWrapper title='Total NPU'>
                            <BlockDataText data={server?.gpu_count} unit='NPU' />
                        </BlockDataWrapper>
                        <BlockDataWrapper title='Total Memory'>
                            <BlockDataText
                                data={server?.memory || '0'}
                                unit={'MB'}
                            />
                        </BlockDataWrapper>
                        <BlockDataWrapper title='Total Inference count'>
                            <BlockDataText data={server?.total_inference_count} />
                        </BlockDataWrapper>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 '>
                        <BlockDataWrapper title='CPU Utilization'>
                            <BlockGaugeChart
                                minValue={0}
                                maxValue={100}
                                value={server?.cpu_utilization}
                                formatText={(value) => `${value || 0}%`}
                            />
                        </BlockDataWrapper>
                        <BlockDataWrapper title='GPU Utilization'>
                            <BlockGaugeChart
                                minValue={0}
                                maxValue={100}
                                value={server?.gpu_utilization}
                                formatText={(value) => `${value || 0}%`}
                            />
                        </BlockDataWrapper>
                        <BlockDataWrapper title='NPU Utilization'>
                            <BlockGaugeChart
                                minValue={0}
                                maxValue={100}
                                value={server?.npu_utilization}
                                formatText={(value) => `${value || 0}%`}
                            />
                        </BlockDataWrapper>
                        <BlockDataWrapper title='Memory Utilization'>
                            <BlockGaugeChart
                                minValue={0}
                                maxValue={100}
                                value={server?.memory_utilization}
                                formatText={(value) => `${value || 0}%`}
                            />
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
                            <BlockColumnChart chartSeries={chartSeries} chartColumns={chartColumn} />
                        </BlockDataWrapper>
                    </div>
                    <div className='grid grid-cols-2 gap-2 '>
                        <Table columns={gpuColumn} dataSource={server?.gpus} />
                        <Table columns={npuColumn} dataSource={server?.npus} />
                    </div>
                </Fragment>
            }
            {isError && <ChartEmpty></ChartEmpty> }
        </div>
    )
}



export default memo(Server)


const ServerHeadSkeleton = () => {
    return (
        <div className='flex gap-2'>
            <Skeleton className='w-[200px] h-10' />
            <Skeleton className='w-[200px] h-10' />
            <Skeleton className='w-[200px] h-10' />
        </div>
    )
}
const ServerBodySkeleton = () => {
    return (
        <Fragment>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2'>
                <Skeleton className='h-[250px]' />
                <Skeleton className='h-[250px]' />
                <Skeleton className='h-[250px]' />
                <Skeleton className='h-[250px]' />
                <Skeleton className='h-[250px]' />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-2 '>
                <Skeleton className='h-[250px]' />
                <Skeleton className='h-[250px]' />
                <Skeleton className='h-[250px]' />
            </div>
            <div className='grid grid-cols-1 gap-2 '>
                <Skeleton className='h-[250px]' />
            </div>
            <div className='grid grid-cols-2 gap-2 '>
                <Skeleton className='h-[500px]' />
                <Skeleton className='h-[500px]' />
            </div>
        </Fragment>
    )
}