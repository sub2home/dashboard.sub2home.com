var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './app',
    output: {
        path: './build',
        filename: 'bundle.[hash].js',
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
    plugins: [new HtmlWebpackPlugin({
        template: 'index.html'
    })],
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};
