"use client";

import Series from "@/core/interfaces/series.interface";
// import ReactApexChart from 'react-apexcharts';
import dynamic from 'next/dynamic';


interface Props {
    data: Series[];
    categories: string[];
}


export default function BlockLineChart({ data, categories }: Props) {
    const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
    
    return (
        <div className="w-full">
            <ReactApexChart
                options={{
                    annotations: {
                        yaxis: [
                            {
                                y: 75,
                                borderColor: '#C27803',
                                strokeDashArray: 0,
                                borderWidth: 1,
                                fillColor: '#C27803',
                                opacity: 0.2,
                            },
                            // {
                            //     y: 75,
                            //     y2: 90,
                            //     fillColor: '#C27803',
                            //     opacity: 0.2,
                            // },
                            {
                                y: 90,
                                borderColor: '#F05252',
                                fillColor: '#F05252',
                                strokeDashArray: 0,
                                borderWidth: 1,
                                opacity: 0.4,
                            },
                            // {
                            //     y: 90,
                            //     y2: 100,
                            //     borderColor: '#F05252',
                            //     fillColor: '#F05252',
                            //     strokeDashArray: 0,
                            //     borderWidth: 3,
                            //     opacity: 0.2,
                            // }
                        ]
                    },
                    chart: {
                        type: 'area',
                        height: 200,
                        background: '#1f2937',
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        curve: 'smooth',
                    },
                    xaxis: {
                        type: 'datetime',
                        categories: categories
                    },
                    yaxis: {
                        min: 0,
                        max: 100,
                        tickAmount: 4,
                        labels: {
                            formatter: function (val: any) {
                                return val.toFixed(0) + "%";
                            }
                        },
                        // title: {
                        //     text: 'Percent'
                        // },
                    },
                    tooltip: {
                        x: {
                            // format: 'dd/MM/yy HH:mm'
                        },
                        // enabled: false
                    },
                    theme: { mode: 'dark' },
                    colors: ['#0E9F6E'],
                    // minValue: 0,
                }}
                series={data}
                type="area" height={350}  width={"100%"}/>
        </div>
    )
}
