import { SelectItem } from "../interfaces";

export const intervalTime : SelectItem[] = [
    {
        value: 0,
        label: 'Stop'
    },
    {
        value: 10 * 1000,
        label: '10s'
    },
    {
        value: 30 * 1000,
        label: '30s'
    },
    {
        value: 60 * 1000,
        label: '1min'
    },

]