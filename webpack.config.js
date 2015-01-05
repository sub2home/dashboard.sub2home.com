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
            loader: 'style!css!less'
        }, {
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.jsx$/,
            loader: 'react-hot!jsx?harmony'
        }, {
            test: /\.(svg|jpg|png)$/,
            loader: 'url?limit=10000'
        }, {
            test: /\.(ttf|eot|woff)$/,
            loader: 'url?limit=100000'
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
