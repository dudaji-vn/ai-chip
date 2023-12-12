import ReactApexChart from 'react-apexcharts';

export default function BlockColumnChart() {
    const data = {
        series: [
            { name: 'Net Profit', data: [44, 55, 57, 56, 61, 58, 63, 60, 66] },
            { name: 'Revenue', data: [76, 85, 101, 98, 87, 105, 91, 114, 94] },
            { name: 'Free Cash Flow', data: [35, 41, 36, 26, 45, 48, 52, 53, 41] },
            { name: 'Net Profit', data: [44, 55, 57, 56, 61, 58, 63, 60, 66] },
            { name: 'Revenue', data: [76, 85, 101, 98, 87, 105, 91, 114, 94] },
        ],
        options: {
            chart: {
                type: 'bar',
                height: 400,
                background: '#1f2937',
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: 'rounded'
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
                categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
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
                custom: function ({ series, seriesIndex, dataPointIndex, w }: any) {
                    return `<div class='bg-gray-800 text-white p-2 px-4 rounded-lg -m-1'>
                        <div class="min-w-5 ">${w.globals.labels[dataPointIndex]}</div>
                        <div class="min-w-5 ">
                            <span class="text-xs text-gray-400">${w.globals.seriesNames[seriesIndex]}: </span>
                            ${series[seriesIndex][dataPointIndex]}
                        </div>

                    </div>`
                },
                y: {
                    formatter: function (val: any) {
                        return "$ " + val + " thousands"
                    }
                }
            },
            colors: ['#84E1BC', '#FDBA8C', '#FACA15', '#A4CAFE', '#F8B4D9'],
        },
    };
    return (
        <div className='w-full barchart'>
            <ReactApexChart options={{ ...data.options, chart: { ...data.options.chart, type: "bar" }, theme: { mode: 'dark' } }} series={data.series} type="bar" height={350} />
        </div>
    )
}
