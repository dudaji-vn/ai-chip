'use client'

import { BlockDataText, BlockDataWrapper } from '@/components/shared/BlockData'
import BlockColumnChart from '@/components/shared/BlockData/BlockColumnChart';
import BlockGaugeChart from '@/components/shared/BlockData/BlockGaugeChart';
import BlockLineChart from '@/components/shared/BlockData/BlockLineChart';
import Table from '@/components/shared/Table'
import { TableColumn } from '@/core/interfaces/table-column.interface';
import Series from '@/core/interfaces/series.interface';
import React from 'react'
import { Select } from '@/components/shared/Form';
import { ClockIcon } from '@heroicons/react/24/solid';

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

export default function Cluster() {
    

    return (
        <div className='flex flex-col gap-2'>
            <div className='flex gap-2'>
                <span className='px-5 py-[10px] rounded-sm border border-gray-600 text-blue-400 text-sm leading-none flex items-center justify-center'>Server IP</span>
                <Select
                    className='w-[346px]'
                    type='secondary'
                    placeholder='192.168.1.1'
                    options={[
                        { label: '192.168.1.2', value: 'item-1' },
                        { label: '192.168.1.3', value: 'item-2' },
                    ]}
                ></Select>
                <Select
                    type='secondary'
                    icon={<ClockIcon className='w-5 h-5' />}
                    placeholder='10s'
                    options={[
                        { label: '20s', value: 'item-1' },
                        { label: '30s', value: 'item-2' },
                        { label: '40s', value: 'item-3' },
                    ]}
                ></Select>
                <span className='text-green-400 after:bg-green-400 relative pl-4 after:content-[""] after:absolute after:top-[50%] after:left-0 after:translate-y-[-50%] after:w-2 after:h-2 after:rounded-full font-light flex items-center justify-center text-sm'>Ready</span>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2'>
                <BlockDataWrapper title='Total CPUs'>
                    <BlockDataText data="8" unit='CPUs'></BlockDataText>
                </BlockDataWrapper>
                <BlockDataWrapper title='Total GPUs'>
                    <BlockDataText data="8" unit="MB"></BlockDataText>
                </BlockDataWrapper>
                <BlockDataWrapper title='Total NPUs'>
                    <BlockDataText data="4" unit="NPUs"></BlockDataText>
                </BlockDataWrapper>
                <BlockDataWrapper title='Total Memory'>
                    <BlockDataText data="74,965.75" unit="MB"></BlockDataText>
                </BlockDataWrapper>
                <BlockDataWrapper title='Total Inference count'>
                    <BlockDataText data="98"></BlockDataText>
                </BlockDataWrapper>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 '>
                <BlockDataWrapper title='CPU Utilization'>
                    <BlockGaugeChart
                        minValue={0}
                        maxValue={100}
                        value={12.2}
                        formatText={(value) => `${value}%`}
                    />
                </BlockDataWrapper>
                <BlockDataWrapper title='GPU Utilization'>
                    <BlockGaugeChart
                        minValue={0}
                        maxValue={100}
                        value={34}
                        formatText={(value) => `${value}°C`}
                    />
                </BlockDataWrapper>
                <BlockDataWrapper title='NPU Utilization'>
                    <BlockGaugeChart
                        minValue={0}
                        maxValue={100}
                        value={12.2}
                        formatText={(value) => `${value}%`}
                    />
                </BlockDataWrapper>
                <BlockDataWrapper title='Memory Utilization'>
                    <BlockGaugeChart
                        minValue={0}
                        maxValue={100}
                        value={12.2}
                        formatText={(value) => `${value}%`}
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
                    <BlockColumnChart chartSeries={chartSeries} chartColumns={chartColumn}/>
                </BlockDataWrapper>
            </div>
            <div className='grid grid-cols-2 gap-2 '>
                <Table columns={[
                    { header: 'GPU', field: 'cpu', type: 'text' },
                    { header: 'Utilization', field: 'utilization', type: 'text' },
                    { header: 'memory', field: 'memory', type: 'text' },
                ]} dataSource={[
                    {cpu: 'test', utilization: 'test', memory: 'test'},
                    {cpu: 'test1', utilization: 'test1', memory: 'test1'},
                    {cpu: 'test1', utilization: 'test1', memory: 'test1'},
                    {cpu: 'test1', utilization: 'test1', memory: 'test1'},
                    {cpu: 'test1', utilization: 'test1', memory: 'test1'},
                    {cpu: 'test1', utilization: 'test1', memory: 'test1'},
                ]}></Table>

                <Table columns={[
                    { header: 'NPU', field: 'cpu', type: 'link' },
                    { header: 'Utilization', field: 'utilization', type: 'text' },
                    { header: 'memory', field: 'memory', type: 'text' },
                ]} dataSource={[
                    {cpu: 'test', utilization: 'test', memory: 'test', link: '/cluster/12345/npu/444234234'},
                    {cpu: 'test1', utilization: 'test1', memory: 'test1', link: '/cluster/12345/npu/444234234'},
                    {cpu: 'test1', utilization: 'test1', memory: 'test1', link: '/cluster/12345/npu/444234234'},
                    {cpu: 'test1', utilization: 'test1', memory: 'test1', link: '/cluster/12345/npu/444234234'},
                    {cpu: 'test1', utilization: 'test1', memory: 'test1', link: '/cluster/12345/npu/444234234'},
                    {cpu: 'test1', utilization: 'test1', memory: 'test1', link: '/cluster/12345/npu/444234234'},
                ]}></Table>
            </div>
        </div>
    )
}
