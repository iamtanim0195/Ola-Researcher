// next.config.js
const nextConfig = {
    reactStrictMode: true,
    server: {
        api: {
            bodyParser: false,
        },
    },
};

module.exports = nextConfig;