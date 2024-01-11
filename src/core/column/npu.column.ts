import { TableColumn } from "../interfaces";

export const npuColumn: TableColumn[] = [
    { 
        header: 'NPU', 
        field: 'npu_id', 
        type: 'link', 
        link_field: (row) => `/npu/${row.npu_id}` 
    },
    { 
        header: '%UTILIZATION', 
        field: 'npu_utilization', 
        type: 'text',
        classNameCol: 'text-right', 
        className: 'text-right'
    },
    { 
        header: 'MEMORY', 
        field: 'memory_capacity', 
        type: 'text', 
        classNameCol: 'text-right w-[250px]', 
        className: 'text-right',
        formatValue: (value: any) => `${value}GB`  
    },
]