/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
	},
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: '/api/:path*',
			},
		];
	},
	webpack: (config, { isServer }) => {
		// This will make Webpack ignore the warning
		config.ignoreWarnings = [{ module: /node_modules\/punycode/ }];
		return config;
	},
};

export default nextConfig;
