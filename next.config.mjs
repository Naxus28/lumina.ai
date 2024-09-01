/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: '/api/:path*',
			},
		];
	},
};

export default nextConfig;
