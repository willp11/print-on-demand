/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    images: {
        domains: ['localhost', 'api-pod.williampage.me', 'https://print-on-demand-v14a.vercel.app'],
        formats: ["image/webp"]
    },
    i18n: {
        locales: ["en"],
        defaultLocale: "en",
    },
}

module.exports = nextConfig
