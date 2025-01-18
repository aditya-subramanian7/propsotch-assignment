/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 's3-alpha-sig.figma.com',
                port: '', // Leave empty unless a specific port is required
                pathname: '/**', // Allow all paths under this domain
            },
        ],
    },
};

export default nextConfig;
