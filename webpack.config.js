var jsLoaders = ['babel'];

if(process.env.NODE_ENV === 'production') {
    jsLoaders.push('transform?envify');
}

module.exports = {
    entry : './js/app.js',
    output : {
        path : './js',
        filename : 'app.bundle.js'
    },
    module : {
        loaders: [
            { test : /\.js$/, loaders : jsLoaders },
            { test: /\.css$/, loaders : ['style', 'css'] }
        ]
    }
};
