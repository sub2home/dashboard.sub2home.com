module.exports = {
    entry: './app',
    output: {
        filename: 'bundle.js',
        path: './build'
    },
    module: {
        loaders: [{
            test: /\.less$/,
            loader: 'style-loader!css-loader!less-loader'
        }, {
            test: /\.jsx$/,
            loader: 'jsx-loader?harmony'
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    devtool: 'inline-source-map'
};
