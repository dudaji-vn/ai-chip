export const ROUTE = {
    'ROOT': {
        path: '/',
        breadcrumb: [
            { label: 'Home', path: '/' }
        ]
    },
    'INTERFACE': {
        path: '/interface-endpoint',
        breadcrumb: [
            { label: 'Home', path: '/' },
            { label: 'Interface endpoint' }
        ]
    },
    'STORAGE': {
        path: '/storage',
        breadcrumb: [
            { label: 'Home', path: '/' },
            { label: 'Storage' }
        ]
    },
} as const