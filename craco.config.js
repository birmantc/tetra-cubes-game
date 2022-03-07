module.exports = {
	webpack: {
		configure: (webpackConfig, { env, paths }) => {
			// eslint-disable-next-line no-param-reassign
			webpackConfig.resolve.fallback = {
				fs: false,
				stream: false,
				path: require.resolve('path-browserify'),
				crypto: require.resolve('crypto-browserify'),
			};
			return webpackConfig;
		},
	},
};
