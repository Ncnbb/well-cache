const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const NODE_ENV = process.env.NODE_ENV;

const initWebpackConfig = async () => {
    return {
        mode: NODE_ENV === 'development' ? 'development' : 'production',
        entry: {
            wellCache: './lib/index.ts'
        },
        output: {
            filename: NODE_ENV === 'development' ? '[name]-development.js' : '[name]-production.js',
            path: path.resolve('./dist'),
            library: 'WellCache',
            libraryTarget: 'umd',
            umdNamedDefine: true
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
                                    'corejs': 3,
                                    'helpers': true,
                                    'regenerator': true,
                                    'useESModules': true
                                }]
                            ]
                        }
                    }
                },
                {
                    test: /\.ts|tsx?$/,
                    use: [
                        {
                            loader: 'ts-loader',
                            options: {
                                // 指定特定的ts编译配置，为了区分脚本的ts配置
                                configFile: path.resolve(__dirname, './tsconfig.json'),
                            },
                        }
                    ],
                    exclude: /node_modules/,
                },
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
        ],
        resolve: {
            alias: {
                // react: require.resolve(REACT_PATH),
                // 'react-dom': require.resolve(REACT_DOM_PATH),
                // 'better-scroll': require.resolve(BSCROLL_PATH),
                // immutable: require.resolve(IMMUTABLE_PATH),
                // 'swiper/dist/css/swiper.css': require.resolve('swiper/dist/css/swiper.css'),
                // swiper: require.resolve(SWIPER_PATH),
                // 'pubsub-js': require.resolve(PUBSUB_PATH),
                // '@': path.resolve(__dirname, './src/book/'),
                // '^': path.resolve(__dirname, './src/otherService/'),
                // '@@': path.resolve(__dirname, './src/'),
                // '@rental': path.resolve(__dirname, './src/mainRental')
            },
            extensions: ['.js', '.jsx', '.json'],
        }
    };
}
module.exports = initWebpackConfig();