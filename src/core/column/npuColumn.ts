import { TableColumn } from "../interfaces";

export const npuColumn: TableColumn[] = [
    { header: 'GPU', field: 'npu_id', type: 'link', link_field: (row) => `/npu/${row.npu_id}` },
    { header: 'UTILIZATION', field: 'npu_utilization', type: 'text' },
    { header: 'MEMORY', field: 'memory_capacity', type: 'text' },
]