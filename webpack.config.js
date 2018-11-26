const path = require('path');

module.exports = {
	mode: 'development',
	entry: {
		main: './src/index.jsx',
	},
	resolve: {
		extensions: [
			'.js', '.jsx',
		],
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist',
	},
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
	},
	module: {
		rules: [{
			test: /\.(js|jsx)$/,
			use: ['babel-loader', 'eslint-loader'],
		},
		{
			test: /\.css$/,
			use: ['style-loader', 'css-loader'],
		}],
	},
};

// module.exports = config
