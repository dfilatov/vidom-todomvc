var webpack = require('webpack');

module.exports = {
    entry : './js/app.js',
    output : {
        path : './js',
        filename : 'app.bundle.js'
    },
    module : {
        loaders: [
            { test : /\.js$/, loader : 'babel' },
            { test: /\.css$/, loaders : ['style', 'css'] }
        ]
    },
    plugins : [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`
        })
    ]
};
