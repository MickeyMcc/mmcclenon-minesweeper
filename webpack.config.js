var path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/Game.js',
    output: {
        path: path.resolve('lib'),
        filename: 'Game.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                  'raw-loader',
                ],
            },
        ],
        
    }
}