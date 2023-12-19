export interface TableColumn {
    header: string;
    field: string;
    classNameCol?: string;
    className?: string;
    type: string;
    link_field?: (row: any) => string;
}