import { ChartPieIcon, CircleStackIcon, Cog8ToothIcon, CommandLineIcon } from "@heroicons/react/24/solid";
import { SidebarItem } from "../interfaces";

export const SIDEBAR_ITEMS: SidebarItem[] = [
    {
        icon: <ChartPieIcon className='w-6 h-6' />,
        text: 'Dashboard',
        link: '/',
        patterns: [
            '^/$',
            '^/server',
            '^/npu'
        ]
    },
    {
        icon: <CommandLineIcon className='w-6 h-6' />,
        text: 'Inference Endpoint',
        link: '/interface-endpoint',
        patterns: [
            '^/interface-endpoint',
        ]
    },
    {
        icon: <CircleStackIcon className='w-6 h-6' />,
        text: 'Storage',
        link: '/storage',
        patterns: [
            '^/storage',
        ]
    },
    {
        icon: <Cog8ToothIcon className='w-6 h-6' />,
        text: 'Adminstration',
        patterns: [
            '^/users',
        ],
        children: [
            { text: 'User list', link: '/users' },
            { text: 'Configuration', link: '/' },
            { text: 'Cluster information', link: '/' },
        ]
    }
]