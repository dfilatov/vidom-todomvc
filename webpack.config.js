module.exports = {
    entry : './js/app.js',
    output : {
        path : './js',
        filename : 'app.bundle.js'
    },
    module : {
        loaders: [
            { test : /\.js$/, loader : 'babel' }
        ]
    }
};
