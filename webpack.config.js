const path = require('path')
const webpack = require('webpack');
const miniCss = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminWebpWebpackPlugin = require("imagemin-webp-webpack-plugin");

module.exports = {
    devServer: {
        port: 8800,
    },
    devtool: 'source-map',
    optimization: {
      minimize: false
    },
    output: {
        path: __dirname + '/dist',
        filename: 'js/main.js',
        assetModuleFilename: (data) => {
            return `${/^.*content\.(png|jpg|jpeg|gif|webp)$/i.test(data.filename) ? (
              `img/content/[name][ext]`
            ) : 
            /\.(mov|mp4|webm)$/i.test(data.filename) ? (
              `video/[name][ext]`
            ) : 
            /^.*icon\.(png|jpg|jpeg|gif|webp)$/i.test(data.filename) ? (
              `img/icon/[name][ext]`
            ) : 
            /\.(svg)$/i.test(data.filename) ? (
              `svg/[name][ext]`
            ) : 
            (
              `img/[name][ext]`
            ) }`
        }, // [name] или [hash], путь куда сохранять изображения
        clean: true, // очищает папку dist
    },
    module: {
        rules: [
            {
              test: /\.(png|jpg|jpeg|gif|svg|mov|mpeg4|webp|mp4|webm)$/i,
              type: 'asset/resource',
            }, {
                test: /\.css$/, // /\.(s*)css$/
                use: [
                    miniCss.loader, 'css-loader', // sass-loader,
                ],
            }, {
                test: /\.html$/,
                use: [
                  {
                    loader: 'html-loader',
                    options: {
                      minimize: false,  // отключаем минификацию html
                    },
                  },
                ],
            }, {
                test: /\.pug$/,
                // loader: 'pug-loader',
                exclude: /(node_modules|bower_components)/,
                use:[
                  {
                    loader: 'pug-loader', // чтобы нормально подтягивало картинки и собирало
                    options: {
                      exports: false,
                      pretty : false,  // не минифицировать
                      minimize: false,
                    }
                  }
                  
                ]
            }, {
              test: /\.(woff|woff2|eot|ttf|otf)$/i,
              type: 'asset/resource',
              generator: {
                filename: 'fonts/[name][ext]',  // указываем путь сборки
              }
            }, 
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            // title: '....' // здесь можно указать title конкретной страницы
            template: './src/pug/index.pug',
            filename: './index.html',   // куда компилировать
            minify: {
              html: false // отключаем минификацию html, еще есть версия minify: false
            },
            scriptLoading: 'blocking', // defer | module. можно также указать inject: 'body' скрипт будет в конце body но с defer
        }),
        new HtmlWebPackPlugin({
            // title: '....' // здесь можно указать title конкретной страницы
            template: './src/pug/product-card.pug',
            filename: './product-card.html',   // куда компилировать
            minify: {
              html: false // отключаем минификацию html, еще есть версия minify: false
            },
            scriptLoading: 'blocking', // defer | module. можно также указать inject: 'body' скрипт будет в конце body но с defer
        }),
        new HtmlWebPackPlugin({
            // title: '....' // здесь можно указать title конкретной страницы
            template: './src/pug/catalog.pug',
            filename: './catalog.html',   // куда компилировать
            minify: {
              html: false // отключаем минификацию html, еще есть версия minify: false
            },
            scriptLoading: 'blocking', // defer | module. можно также указать inject: 'body' скрипт будет в конце body но с defer
        }),
        new miniCss({
            filename: 'css/style.css',
        }),
        new CopyWebpackPlugin({
          patterns: [  
            { from: 'src/svg/catalog-coffee.svg', to: 'svg/' },
            { from: 'src/svg/catalog-tea.svg', to: 'svg/' },
            { from: 'src/svg/catalog-syrups.svg', to: 'svg/' },
            { from: 'src/svg/catalog-milk.svg', to: 'svg/' },
            { from: 'src/svg/catalog-water.svg', to: 'svg/' },
            { from: 'src/svg/catalog-coffee-machines.svg', to: 'svg/' },
            { from: 'src/svg/catalog-accessories.svg', to: 'svg/' },
            { from: 'src/svg/catalog-dishes.svg', to: 'svg/' },
            { from: 'src/svg/catalog-gifts-sets.svg', to: 'svg/' },
            { from: 'src/svg/catalog-different.svg', to: 'svg/' },
            
          ],
        }),
        // new ImageminWebpWebpackPlugin({
        //   config: [{
        //     test: /.(jpe?g|png)/,
        //     options: {
        //       quality: 90,
        //     },
        //   }],
        //   overrideExtension: true,
        //   detailedLogs: false,
        //   silent: false,
        //   strict: true,
        // }),
    ]
}