/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    images: {
        domains: ['localhost', 'https://api-pod.williampage.me']
    }
}

module.exports = nextConfig
