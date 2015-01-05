module.exports = {
    entry: './app',
    output: {
        path: './dist',
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
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
};
