import { TableColumn } from "../interfaces";

export const gpuColumn: TableColumn[] = [
    { 
        header: 'GPU', 
        field: 'gpu_name', 
        type: 'text' 
    },
    { 
        header: '% UTILIZATION', 
        field: 'gpu_utilization', 
        type: 'text', 
        classNameCol: 'text-right', 
        className: 'text-right' 
    },
    { 
        header: 'MEMORY', 
        field: 'gpu_memory', 
        type: 'text', 
        classNameCol: 'text-right w-[250px]', 
        className: 'text-right', 
        formatValue: (value: any) => `${value}GB` 
    },
]