var webpack = require('webpack');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:8080',
        'webpack/hot/only-dev-server',
        './app',
    ],
    output: {
        path: __dirname,
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        loaders: [{
            test: /\.less$/,
            loader: 'style-loader!css-loader!less-loader'
        }, {
            test: /\.jsx$/,
            loaders: ['react-hot', 'jsx-loader?harmony']
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    devtool: 'inline-source-map'
};
