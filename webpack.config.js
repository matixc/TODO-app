module.exports = {
    entry: './src/app.js',
    output: {
        path: __dirname + "/build",
        filename: 'bundle.js'
    },

    devServer: {
        inline: true,
        contentBase: "./build",
        port: 3000
    },

    module: {
        loaders: [
        {
            test: /\.js$/,
            exclude: /(node_modules)/,
            loader: "babel-loader",
            query: {
                presets: ["es2015", "react"]
            }
        },
        {
            test: /\.scss$/,
            loader: "style-loader!css-loader!sass-loader"
        }
        ]
    }
};
