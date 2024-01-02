"use client";

import dynamic from 'next/dynamic';

interface Props {
    data: number[];
    labels: number[];
    divided_y?: number;
    formatY?: (val: any) => string;
    min?: number;
    max?: number;
}
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const BlockLineChart = ({ 
    data, 
    labels, 
    divided_y = 4, 
    formatY = (val: number) => val.toFixed(0) + "%",
    min = 0,
    max = 100,
}: Props) => {

    const generateColor = (val:number) => {
        if(val > (max - min) / 100 * 90) return ['#F05252'];
        if(val > (max - min) / 100 * 75) return ['#C27803'];
        return ['#0E9F6E'];
    }

    return (
        <div className="w-full">
            <ReactApexChart
                options={{
                    annotations: {
                        yaxis: [
                            {
                                y: (max - min) / 100 * 75,
                                borderColor: '#C27803',
                                strokeDashArray: 0,
                                borderWidth: 1,
                                fillColor: '#C27803',
                                opacity: 0.2,
                            },
                            {
                                y: (max - min) / 100 * 90,
                                borderColor: '#F05252',
                                fillColor: '#F05252',
                                strokeDashArray: 0,
                                borderWidth: 1,
                                opacity: 0.4,
                            },
                        ]
                    },
                    chart: {
                        type: 'area',
                        height: 200,
                        background: '#1f2937',
                        animations: {
                            enabled: false,
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        curve: 'smooth',
                    },
                    xaxis: {
                        type: 'datetime',
                        categories: labels,
                    },
                    yaxis: {
                        min: min,
                        max: max,
                        tickAmount: divided_y,
                        labels: {
                            formatter: formatY
                        },
                    },
                    theme: { mode: 'dark' },
                    colors: generateColor(data[data.length - 1]),
                    grid: { borderColor: '#374151' },
                }}
                series={[
                    {
                        name: "Data",
                        data: data
                    }
                ]}
                type="area" height={350} width={"100%"} />
        </div>
    )
}


export default BlockLineChart;