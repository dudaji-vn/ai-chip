"use client";

import Series from '@/core/interfaces/series.interface';
// import ReactApexChart from 'react-apexcharts';
import dynamic from 'next/dynamic';

interface Props {
    chartSeries: Series[];
    chartColumns: string[];
}

export default function BlockColumnChart({ chartSeries, chartColumns } : Props) {
    const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
    return (
        <div className='w-full barchart'>
            <ReactApexChart options={{ 
            chart: {
                type: 'bar',
                height: 400,
                background: '#1f2937',
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    // endingShape: 'rounded'
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            xaxis: {
                categories: chartColumns,
            },
            yaxis: {
                title: {
                    // text: '$ (thousands)'
                }
            },
            fill: {
                opacity: 1,
                colors: ['#84E1BC', '#FDBA8C', '#FACA15', '#A4CAFE', '#F8B4D9']
            },
            tooltip: {
                // custom: function ({ series, seriesIndex, dataPointIndex, w }: any) {
                //     return `<div class='bg-gray-800 text-white p-2 px-4 rounded-lg -m-1'>
                //         <div class="min-w-5 ">${w.globals.labels[dataPointIndex]}</div>
                //         <div class="min-w-5 ">
                //             <span class="text-xs text-gray-400">${w.globals.seriesNames[seriesIndex]}: </span>
                //             ${series[seriesIndex][dataPointIndex]}
                //         </div>
                //     </div>`
                // },
                y: {
                    formatter: function (val: any) {
                        return "$ " + val + " thousands"
                    }
                }
            },
            colors: ['#84E1BC', '#FDBA8C', '#FACA15', '#A4CAFE', '#F8B4D9'],
            theme: { mode: 'dark' } }} 
            series={chartSeries} type="bar" height={350}  width={"100%"} />
        </div>
    )
}
