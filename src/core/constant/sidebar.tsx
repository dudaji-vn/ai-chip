import { ChartPieIcon, CircleStackIcon, Cog8ToothIcon, CommandLineIcon } from "@heroicons/react/24/solid";
import { SidebarItem } from "../interfaces";

export const SIDEBAR_ITEMS: SidebarItem[] = [
    {
        icon: <ChartPieIcon className='w-6 h-6' />,
        text: 'Dashboard',
        link: '/',
        pattern: '^/(cluster)?$'
    },
    {
        icon: <CommandLineIcon className='w-6 h-6' />,
        text: 'Inference Endpoint',
        link: '/interface-endpoint',
        pattern: '^/interface-endpoint'
    },
    {
        icon: <CircleStackIcon className='w-6 h-6' />,
        text: 'Storage',
        link: '/storage',
        pattern: '^/storage'
    },
    {
        icon: <Cog8ToothIcon className='w-6 h-6' />,
        text: 'Adminstration',
        pattern: '^/admin',
        children: [
            { text: 'User list', link: '/admin/users' },
            { text: 'Configuration', link: '/admin/configuration' },
            { text: 'Cluster information', link: '/admin/cluster-information' },
        ]
    }
]