import { TableColumn } from "../interfaces";

export const serverColumn: TableColumn[] = [
    { header: 'Server IP', field: 'server_ip', type: 'link', link_field: (row) => '/server/' + row.server_id },
    { header: 'Hostname', field: 'server_hostname', type: 'text' },
    { header: 'Status', field: 'server_status', type: 'status' },
    { header: 'Role', field: 'server_role', type: 'text', classNameCol: 'w-[120px]' },
    { header: 'CPUs Counts', field: 'cpu_cores', type: 'text', classNameCol: 'w-[120px]', className: 'text-right' },
    { header: 'GPUs Counts', field: 'gpus', type: 'length', classNameCol: 'w-[120px]', className: 'text-right' },
    { header: 'NPU Counts', field: 'npus', type: 'length', classNameCol: 'w-[120px]', className: 'text-right' },
]