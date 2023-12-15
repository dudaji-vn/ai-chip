import Series from "@/core/interfaces/series.interface";
import ReactApexChart from "react-apexcharts";
interface Props {
    data: Series[];
    categories: string[];
}


export default function BlockLineChart({ data, categories }: Props) {
    const generateColors = (data: Series[]) => {
        return data[0].data.map((d, idx) => {
            let color = '#0E9F6E';
            if(d > 75) color = '#F05252';
            if(d > 90) color = '#C27803';
            return {
                offset: idx / data.length * 100,
                color,
                opacity: 0.5
            };
        })
    }
    
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
                            {
                                y: 75,
                                y2: 90,
                                fillColor: '#C27803',
                                opacity: 0.2,
                            },
                            {
                                y: 90,
                                borderColor: '#F05252',
                                fillColor: '#F05252',
                                strokeDashArray: 0,
                                borderWidth: 1,
                                opacity: 0.4,
                            },
                            {
                                y: 90,
                                y2: 100,
                                borderColor: '#F05252',
                                fillColor: '#F05252',
                                strokeDashArray: 0,
                                borderWidth: 3,
                                opacity: 0.2,
                            }
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
                    fill: {
                        opacity: 1,
                        gradient: {
                            shadeIntensity: 1,
                            opacityFrom: 0.7,
                            opacityTo: 0.9,
                            colorStops: generateColors(data)
                        },
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
                type="area" height={350} />
        </div>
    )
}
