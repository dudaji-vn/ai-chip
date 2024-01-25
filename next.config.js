/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    basePath: '/npu/dashboard',
    env: {
        BASE_PATH: '/npu/dashboard', // Add this line
    },
    
};

module.exports = nextConfig;


