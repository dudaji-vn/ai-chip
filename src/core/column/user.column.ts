import { TableColumn } from "../interfaces";

export const userColumn: TableColumn[] = [
    { header: 'ID', field: 'id', type: 'text' },
    { header: 'NAME', field: 'name', type: 'text' },
    { header: 'ROLE', field: 'role', type: 'text' },
    { header: '', field: '', type: 'action'},
]