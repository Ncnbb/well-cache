const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const NODE_ENV = process.env.NODE_ENV;

const initWebpackConfig = async () => {
    return {
        mode: 'development',
        entry: {
            index:path.join(__dirname, './src/index.js'),
        },
        output: {
            filename: '[name].js',
            path: path.join(__dirname, './dist'),
            publicPath: '/'
        },
        module: {
            rules: [
                { test: /\.handlebars$/, loader: "handlebars-loader" },
                {
                    test: /\.js|jsx?$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    require('@babel/preset-env').default,
                                    {
                                        'targets': {
                                            browsers: [ // 浏览器
                                                // 'Chrome >= 45', 
                                                // 'last 2 Firefox versions',
                                                // 'ie >= 10',
                                                //  'Edge >= 12',
                                                // 'iOS >= 9', 
                                                // 'Android >= 4', 
                                                // 'last 2 ChromeAndroid versions'
                                            ]
                                        },
                                        modules: false,
                                        debug: true,
                                        useBuiltIns: false,
                                        ignoreBrowserslistConfig: false,
                                    }
                                ]
                            ],
                            plugins: [
                                ["@babel/plugin-proposal-decorators", { "legacy": true }],
                                ['@babel/plugin-proposal-class-properties', {
                                    'loose': true
                                }],
                                ['@babel/plugin-transform-runtime', {
                                    'proposal': true,
                                    'corejs': 3,
                                    'helpers': true,
                                    'regenerator': true,
                                    'useESModules': true
                                }]
                            ]
                        }
                    }
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
        ],
        resolve: {
            alias: {
                WellCache: NODE_ENV == 'development' ? require.resolve( path.resolve('./es/index.js')) : require.resolve( path.resolve('./dist/index.js')),
            },
            extensions: ['.js', '.jsx', '.json'],
        },
        devServer: {
            host: '0.0.0.0',
            port: '4321'
        }
    };
}
module.exports = initWebpackConfig();