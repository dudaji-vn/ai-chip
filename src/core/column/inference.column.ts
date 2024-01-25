import { TableColumn } from "../interfaces";

export const inferenceEdnpointColumn: TableColumn[] = [
    { header: 'endpoint', field: 'endpoint', type: 'text'},
    { header: 'chip type', field: 'chip_type', type: 'text' },
    { header: 'Model Version', field: 'model_version', type: 'text' },
    { header: 'created at', field: 'created_at', type: 'text'},
    { header: '', field: 'delete', type: 'action'},
]