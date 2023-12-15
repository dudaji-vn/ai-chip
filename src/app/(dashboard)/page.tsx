'use client'

import { BlockDataText, BlockDataWrapper } from '@/components/shared/BlockData'
import BlockColumnChart from '@/components/shared/BlockData/BlockColumnChart';
import BlockGaugeChart from '@/components/shared/BlockData/BlockGaugeChart';
import Table from '@/components/shared/Table'
import { TableColumn } from '@/core/interfaces/table-column.interface';
import Series from '@/core/interfaces/series.interface';
import React from 'react'
import { Select } from '@/components/shared/Form';

const dataSource = [
    { server_ip: '192.168.1.10', hostname: 'server-1', status: 'Ready', role: 'Manager', cpu: 36, gpu: 36, npu: 54, link: '/cluster/123456789' },
    { server_ip: '10.0.0.20', hostname: 'server-2', status: 'Ready', role: 'Worker', cpu: 36, gpu: 36, npu: 54, link: '/cluster/123456789' },
    { server_ip: '192.168.1.100', hostname: 'server-3', status: 'Not Ready', role: 'Communication', cpu: 36, gpu: 36, npu: 54, link: '/cluster/123456789' },
    { server_ip: '172.16.0.15', hostname: 'server-4', status: 'Ready', role: 'Manager', cpu: 36, gpu: 36, npu: 54, link: '/cluster/123456789' },
    { server_ip: '10.1.1.30', hostname: 'server-5', status: 'Ready', role: 'Worker', cpu: 36, gpu: 36, npu: 54, link: '/cluster/123456789' },
];

const columns: TableColumn[] = [
    { header: 'Server IP', field: 'server_ip', type: 'link' },
    { header: 'Hostname', field: 'hostname', type: 'text' },
    { header: 'Status', field: 'status', type: 'status' },
    { header: 'Role', field: 'role', type: 'text', classNameCol: 'w-[120px]' },
    { header: 'CPUs Counts', field: 'cpu', type: 'text', classNameCol: 'w-[120px]', className: 'text-right' },
    { header: 'GPUs Counts', field: 'gpu', type: 'text', classNameCol: 'w-[120px]', className: 'text-right' },
    { header: 'NPU Counts', field: 'npu', type: 'text', classNameCol: 'w-[120px]', className: 'text-right' },
]

const chartSeries: Series[] = [
    { name: 'Net Profit', data: [44, 55, 57, 56, 61, 58, 63, 60, 66] },
    { name: 'Revenue', data: [76, 85, 101, 98, 87, 105, 91, 114, 94] },
    { name: 'Free Cash Flow', data: [35, 41, 36, 26, 45, 48, 52, 53, 41] },
    { name: 'Net Profit', data: [44, 55, 57, 56, 61, 58, 63, 60, 66] },
    { name: 'Revenue', data: [76, 85, 101, 98, 87, 105, 91, 114, 94] },
]
const chartColumn: string[] = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']

export default function ClusterOverview() {
    
    return (
        <div className='flex flex-col gap-2'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2'>
                <BlockDataWrapper title='Total CPUs'>
                    <BlockDataText data="36" unit='CPUs'></BlockDataText>
                </BlockDataWrapper>
                <BlockDataWrapper title='Total GPUs'>
                    <BlockDataText data="16" unit="--"></BlockDataText>
                </BlockDataWrapper>
                <BlockDataWrapper title='Total NPUs'>
                    <BlockDataText data="54" unit="NPUs"></BlockDataText>
                </BlockDataWrapper>
                <BlockDataWrapper title='Total Inference count'>
                    <BlockDataText data="2312"></BlockDataText>
                </BlockDataWrapper>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 '>
                <BlockDataWrapper title='Avg CPU Utilization'>
                    <BlockGaugeChart
                        minValue={0}
                        maxValue={100}
                        value={12.2}
                        formatText={(value) => `${value}%`}
                    />
                </BlockDataWrapper>
                <BlockDataWrapper title='Avg GPU Utilization'>
                    <BlockGaugeChart
                        minValue={0}
                        maxValue={100}
                        value={34}
                        formatText={(value) => `${value}°C`}
                    />
                </BlockDataWrapper>
                <BlockDataWrapper title='Avg NPU Utilization'>
                    <BlockGaugeChart
                        minValue={0}
                        maxValue={100}
                        value={12.2}
                        formatText={(value) => `${value}%`}
                    />
                </BlockDataWrapper>
            </div>
            {/* <div className='grid grid-cols-2 gap-2 '>
                <BlockDataWrapper title='NPU Utilization'>
                    <BlockLineChart />
                </BlockDataWrapper>
                <BlockDataWrapper title='NPU Utilization'>
                    <BlockLineChart />
                </BlockDataWrapper>
            </div> */}
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
            <Table columns={columns} dataSource={dataSource}></Table>
        </div>
    )
}
