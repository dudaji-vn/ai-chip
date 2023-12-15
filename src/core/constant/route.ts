export const ROUTE = {
    'ROOT': {
        path: '/',
        pattern: '^/$',
        breadcrumb: [
            { label: 'Cluster overview' }
        ]
    },
    'NPU': {
        path: '/cluster/:clusterId/npu/:npuId',
        pattern: '/cluster/[^/]+/npu/[^/]+',
        breadcrumb: [
            { label: 'Cluster overview', path: '/' },
            { label: 'Cluster page', path: '/cluster/123' },
            { label: 'NPU details' },
        ]
    },
    'CLUSTERPAGE': {
        path: '/cluster',
        pattern: '/cluster/*',
        breadcrumb: [
            { label: 'Cluster overview', path: '/' },
            { label: 'Cluster page' }
        ]
    },
    'INTERFACE': {
        path: '/interface-endpoint',
        pattern: '/interface-endpoint',
        breadcrumb: [
            { label: 'Interface endpoint' }
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