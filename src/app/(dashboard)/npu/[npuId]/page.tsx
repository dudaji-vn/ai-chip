'use client'

import { BlockDataText, BlockDataWrapper } from '@/components/shared/BlockData'
import BlockColumnChart from '@/components/shared/BlockData/BlockColumnChart';
import BlockGaugeChart from '@/components/shared/BlockData/BlockGaugeChart';
import BlockLineChart from '@/components/shared/BlockData/BlockLineChart';
import Series from '@/core/interfaces/series.interface';
import React, { Fragment, useCallback, useEffect } from 'react'
import { Select } from '@/components/shared/Form';
import { ClockIcon } from '@heroicons/react/24/solid';
import useNpuApi from '@/core/hooks/api/useNpuApi';
import { useAppDispatch, useAppSelector } from '@/stores';
import useNpuDetailApi from '@/core/hooks/api/useNpuDetailApi';
import { changeBreadcrumb, changeCurrentUserId } from '@/stores/slice/global.slice';
import Link from 'next/link';
import Skeleton from '@/components/shared/Skeleton';
import { useRouter } from 'next/navigation';
import { intervalTime } from '@/core/constant';

const chartSeries: Series[] = [
    { name: 'Net Profit', data: [44, 55, 57, 56, 61, 58, 63, 60, 66] },
    { name: 'Revenue', data: [76, 85, 101, 98, 87, 105, 91, 114, 94] },
    { name: 'Free Cash Flow', data: [35, 41, 36, 26, 45, 48, 52, 53, 41] },
    { name: 'Net Profit', data: [44, 55, 57, 56, 61, 58, 63, 60, 66] },
    { name: 'Revenue', data: [76, 85, 101, 98, 87, 105, 91, 114, 94] },
]
const chartColumn: string[] = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']

export default function NPU({ params }: { params: { npuId: string } }) {
    const [npuRealtimeData, setNpuRealtimeData] = React.useState<any>({});
    const [timer, setTimer] = React.useState<null | number>(null);

    const dispatch = useAppDispatch();
    const router = useRouter();
    
    const current_user_id = useAppSelector(state => state.GlobalStore.current_user_id);
    const breadcrumb = useAppSelector(state => state.GlobalStore.breadcrumb);
    const user_id = useAppSelector(state => state.AuthStore.user?.id);
    
    let npuId = params?.npuId || '';

    const { isLoading: isLoadingListNpu, npus, isError: isErrorListNpu } = useNpuApi(current_user_id || user_id || '')
    const { isLoading, npu, isError } = useNpuDetailApi(npuId || '', timer)
    
    const npuList = npus?.filter((item: any) => item?.server_id === npu?.server_id) // filter npu by server_id
                            ?.map((npu: any) => ({ label: npu.npu_device_name, value: npu.npu_id }))  // map npu to option
                            || []
    

    const handleChangeNpu = useCallback((value: string) => {
        if (!value) return;
        router.push(`/npu/${value}`)
    }, [router])

    useEffect(() => {
        if (npu && npu.user_id) {
            if (current_user_id !== npu.user_id) {
                dispatch(changeCurrentUserId(npu.user_id))
            }
        }
    }, [current_user_id, dispatch, npu])

    useEffect(() => {
        if(npu && npu?.server_ip && npu?.server_id && breadcrumb?.server?.id !== npu?.server_ip) {
            dispatch(changeBreadcrumb({
                server: {
                    id: npu?.server_id, 
                    link: '/server/' + npu?.server_id, 
                    title: npu?.server_ip
                }
            }))
        }
    }, [breadcrumb?.server?.id, dispatch, npu])

    useEffect(() => {
        if (!npu) return;
        if(!timer) {
            if(Object.keys(npuRealtimeData).length == 0 ) {
                setNpuRealtimeData({ [new Date().getTime()]: npu });
            }
            return;
        }

        let timerId = setInterval(() => {
            setNpuRealtimeData((prev: any) => {
                return {
                    ...prev,
                    [new Date().getTime()]: npu
                }
            })
        }, timer);

        return () => clearInterval(timerId);

    }, [npu, npuRealtimeData, timer])

    const onChangeTimer = (value: string | number) => {
        setTimer(parseInt(value.toString()))
    }

    return (
        <div className='flex flex-col gap-2'>
            {isLoadingListNpu && <NPUHeadSkeleton />}
            {!isLoadingListNpu && !isErrorListNpu &&
                <div className='flex gap-2'>
                    <span className='px-5 py-[10px] rounded-sm border border-gray-600 text-blue-400 text-sm leading-none flex items-center justify-center'>NPUs</span>
                    <Select
                        className='w-[346px]'
                        type='secondary'
                        placeholder={npu?.npu_device_name || 'Select NPU'}
                        options={npuList}
                        onChange={handleChangeNpu}
                    ></Select>
                    <Select
                        type='secondary'
                        icon={<ClockIcon className='w-5 h-5' />}
                        placeholder='Timer'
                        options={intervalTime}
                        onChange={onChangeTimer}
                    ></Select>
                </div>
            }
            {isLoading && <NPUContentSkeleton />}
            {!isLoading && !isError &&
                <Fragment>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
                        <BlockDataWrapper title='Name' className='col-span-2'>
                            <BlockDataText dataPrimary={npu?.npu_device_name}></BlockDataText>
                        </BlockDataWrapper>
                        <BlockDataWrapper title='Firmware Version'>
                            <BlockDataText dataPrimary={npu?.firmware_version}></BlockDataText>
                        </BlockDataWrapper>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
                        <BlockDataWrapper title='Memory capacity'>
                            <BlockDataText
                                data={npu?.memory_capacity}
                                unit="GB"
                            />
                        </BlockDataWrapper>
                        <BlockDataWrapper title='Total Inference count'>
                            <BlockDataText
                                data={npu?.inference_count}
                            />
                        </BlockDataWrapper>
                        <BlockDataWrapper title='Server IP'>
                            <Link href={`/server/${npu?.server_id}`}>
                                <BlockDataText
                                    data={npu?.server_ip}
                                />
                            </Link>
                        </BlockDataWrapper>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 '>
                        <BlockDataWrapper title='NPU Utilization'>
                            <BlockGaugeChart
                                minValue={0}
                                maxValue={100}
                                value={npu?.npu_utilization}
                                formatText={(value) => `${value || 0}%`}
                            />
                        </BlockDataWrapper>
                        <BlockDataWrapper title='Memory Utilization'>
                            <BlockGaugeChart
                                minValue={0}
                                maxValue={100}
                                value={npu?.memory_utilization}
                                formatText={(value) => `${value || 0}GB`}
                            />
                        </BlockDataWrapper>
                        <BlockDataWrapper title='Power Usage'>
                            <BlockGaugeChart
                                minValue={0}
                                maxValue={500}
                                value={npu?.power_usage}
                                formatText={(value) => `${value || 0}W`}
                            />
                        </BlockDataWrapper>
                        <BlockDataWrapper title='Temperature'>
                            <BlockGaugeChart
                                minValue={0}
                                maxValue={100}
                                value={npu?.temperature}
                                formatText={(value) => `${value || 0}°C`}
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
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-2 '>
                        <BlockDataWrapper title='NPU Utilization'>
                            <BlockLineChart
                                data={Object.keys(npuRealtimeData).map((key: any) => npuRealtimeData[key]?.npu_utilization || 0)}
                                labels={Object.keys(npuRealtimeData).map(item => parseInt(item))}
                            ></BlockLineChart>
                        </BlockDataWrapper>
                        <BlockDataWrapper title='Memory Utilization'>
                            <BlockLineChart
                                data={Object.keys(npuRealtimeData).map((key: any) => npuRealtimeData[key]?.memory_utilization || 0)}
                                labels={Object.keys(npuRealtimeData).map(item => parseInt(item))}
                                divided_y={5}
                                min={0}
                                max={200}
                                formatY={(val: number) => val + 'GB'}
                            ></BlockLineChart>
                        </BlockDataWrapper>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-2 '>
                        <BlockDataWrapper title='Power Draw'>
                            <BlockLineChart
                                data={Object.keys(npuRealtimeData).map((key: any) => npuRealtimeData[key]?.power_usage || 0)}
                                labels={Object.keys(npuRealtimeData).map(item => parseInt(item))}
                                divided_y={5}
                                min={0}
                                max={200}
                                formatY={(val: number) => val + 'W'}
                            ></BlockLineChart>
                        </BlockDataWrapper>
                        <BlockDataWrapper title='Temperature'>
                            <BlockLineChart
                                data={Object.keys(npuRealtimeData).map((key: any) => npuRealtimeData[key]?.temperature || 0)}
                                labels={Object.keys(npuRealtimeData).map(item => parseInt(item))}
                                min={0}
                                max={100}
                                formatY={(val: number) => val + '°C'}
                            ></BlockLineChart>
                        </BlockDataWrapper>
                    </div>
                </Fragment>
            }
        </div>
    )
}


const NPUHeadSkeleton = () => {
    return (
        <div className='flex gap-2'>
            <Skeleton className='w-[200px] h-10' />
            <Skeleton className='w-[200px] h-10' />
            <Skeleton className='w-[200px] h-10' />
        </div>
    )
}

const NPUContentSkeleton = () => {
    return (
        <Fragment>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
                <Skeleton className='col-span-2 h-40' />
                <Skeleton className='h-40' />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
                <Skeleton className='h-40' />
                <Skeleton className='h-40' />
                <Skeleton className='h-40' />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 '>
                <Skeleton className='h-40' />
                <Skeleton className='h-40' />
                <Skeleton className='h-40' />
                <Skeleton className='h-40' />
            </div>
            <div className='grid grid-cols-1 gap-2 '>
                <Skeleton className='h-80' />
            </div>
        </Fragment>
    )
}