import { TableColumn } from "../interfaces";

export const gpuColumn: TableColumn[] = [
    { header: 'GPU', field: 'name', type: 'text' },
    { header: 'UTILIZATION', field: 'utilization', type: 'text' },
    { header: 'MEMORY', field: 'memory', type: 'text' },
]