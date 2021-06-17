const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssPresetEnv = require('postcss-preset-env');

const devMode = false;

module.exports = {
	mode: devMode ? 'development' : 'production',
	entry: ['./development/js/app.js', './development/scss/app.scss'],

	output: {
		filename: 'js/app.min.js',
		path: path.resolve(__dirname, 'assets'),
	},

	optimization: {},

	module: {
		rules: [
			{
				// Thiết lập build scss
				test: /\.(sa|sc)ss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						// Interprets CSS
						loader: 'css-loader',
						options: {
							importLoaders: 2,
						},
					},
					{
						// minify CSS và thêm autoprefix
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: devMode
									? () => []
									: () => [
											postcssPresetEnv({
												browsers: ['>1%'],
											}),
											require('cssnano')(),
									  ],
							},
						},
					},
					{
						loader: 'sass-loader',
					},
				],
			},
			{
				// Thiết lập lưu các ảnh sử dụng bởi CSS
				// lưu dưới đường dẫn images cùng file site.css
				test: /\.(png|jpe?g|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							// Image sử dụng bởi CSS lưu tại
							publicPath: '../images',
							emitFile: false,
						},
					},
				],
			},
		],
	},

	plugins: [
		new MiniCssExtractPlugin({
			filename: devMode ? 'css/app.css' : 'css/app.min.css',
		}),
	],
};
