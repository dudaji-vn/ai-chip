import type { NextApiRequest, NextApiResponse } from 'next';

import httpProxy from 'http-proxy';

export const config = {
    api: {
        bodyParser: false,
    },
};

const proxy = httpProxy.createProxyServer();

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {
    return new Promise(() => {
        proxy.web(req, res, {
            target: 'http://localhost:4000',
            changeOrigin: true,
            selfHandleResponse: false,
        });
    });
}
