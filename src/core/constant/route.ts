export const ROUTE = {
    'ROOT': {
        path: '/',
        pattern: '^/$',
        breadcrumb: [
            { label: 'Cluster overview' }
        ]
    },
    'SERVER': {
        path: '/server/:serverId',
        pattern: '/server/[^/]+',
        breadcrumb: [
            { label: 'Cluster overview', path: '/' },
            { label: 'Server' },
        ]
    },
    'NPU': {
        path: '/npu/:npuId',
        pattern: '/npu/[^/]+',
        breadcrumb: [
            { label: 'Cluster overview', path: '/' },
            { label: 'Server', dynamic_path: 'server' },
            { label: 'NPU details' },
        ]
    },
    'INFERENCE': {
        path: '/inference-endpoint',
        pattern: '/inference-endpoint',
        breadcrumb: [
            { label: 'Inference endpoint' }
        ]
    },
    'STORAGE': {
        path: '/storage',
        pattern: '/storage',
        breadcrumb: [
            { label: 'Storage' }
        ]
    },
} as const