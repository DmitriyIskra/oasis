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
            template: './src/pug/product-card-tea.pug',
            filename: './product-card-tea.html',   // куда компилировать
            minify: {
              html: false // отключаем минификацию html, еще есть версия minify: false
            },
            scriptLoading: 'blocking', // defer | module. можно также указать inject: 'body' скрипт будет в конце body но с defer
        }),
        new HtmlWebPackPlugin({
            // title: '....' // здесь можно указать title конкретной страницы
            template: './src/pug/product-card-coffee.pug',
            filename: './product-card-coffee.html',   // куда компилировать
            minify: {
              html: false // отключаем минификацию html, еще есть версия minify: false
            },
            scriptLoading: 'blocking', // defer | module. можно также указать inject: 'body' скрипт будет в конце body но с defer
        }),
        new HtmlWebPackPlugin({
            // title: '....' // здесь можно указать title конкретной страницы
            template: './src/pug/product-card-syrups.pug',
            filename: './product-card-syrups.html',   // куда компилировать
            minify: {
              html: false // отключаем минификацию html, еще есть версия minify: false
            },
            scriptLoading: 'blocking', // defer | module. можно также указать inject: 'body' скрипт будет в конце body но с defer
        }),
        new HtmlWebPackPlugin({
            // title: '....' // здесь можно указать title конкретной страницы
            template: './src/pug/product-card-milk.pug',
            filename: './product-card-milk.html',   // куда компилировать
            minify: {
              html: false // отключаем минификацию html, еще есть версия minify: false
            },
            scriptLoading: 'blocking', // defer | module. можно также указать inject: 'body' скрипт будет в конце body но с defer
        }),
        new HtmlWebPackPlugin({
            // title: '....' // здесь можно указать title конкретной страницы
            template: './src/pug/product-card-alternative-milk.pug',
            filename: './product-card-alternative-milk.html',   // куда компилировать
            minify: {
              html: false // отключаем минификацию html, еще есть версия minify: false
            },
            scriptLoading: 'blocking', // defer | module. можно также указать inject: 'body' скрипт будет в конце body но с defer
        }),
        new HtmlWebPackPlugin({
            // title: '....' // здесь можно указать title конкретной страницы
            template: './src/pug/product-card-water.pug',
            filename: './product-card-water.html',   // куда компилировать
            minify: {
              html: false // отключаем минификацию html, еще есть версия minify: false
            },
            scriptLoading: 'blocking', // defer | module. можно также указать inject: 'body' скрипт будет в конце body но с defer
        }),
        new HtmlWebPackPlugin({
            // title: '....' // здесь можно указать title конкретной страницы
            template: './src/pug/product-card-carbonated-drink.pug',
            filename: './product-card-carbonated-drink.html',   // куда компилировать
            minify: {
              html: false // отключаем минификацию html, еще есть версия minify: false
            },
            scriptLoading: 'blocking', // defer | module. можно также указать inject: 'body' скрипт будет в конце body но с defer
        }),
        new HtmlWebPackPlugin({
            // title: '....' // здесь можно указать title конкретной страницы
            template: './src/pug/product-card-dishes.pug',
            filename: './product-card-dishes.html',   // куда компилировать
            minify: {
              html: false // отключаем минификацию html, еще есть версия minify: false
            },
            scriptLoading: 'blocking', // defer | module. можно также указать inject: 'body' скрипт будет в конце body но с defer
        }),
        new HtmlWebPackPlugin({
            // title: '....' // здесь можно указать title конкретной страницы
            template: './src/pug/product-card-fridge.pug',
            filename: './product-card-fridge.html',   // куда компилировать
            minify: {
              html: false // отключаем минификацию html, еще есть версия minify: false
            },
            scriptLoading: 'blocking', // defer | module. можно также указать inject: 'body' скрипт будет в конце body но с defer
        }),
        new HtmlWebPackPlugin({
            // title: '....' // здесь можно указать title конкретной страницы
            template: './src/pug/product-card-dishes-sets.pug',
            filename: './product-card-dishes-sets.html',   // куда компилировать
            minify: {
              html: false // отключаем минификацию html, еще есть версия minify: false
            },
            scriptLoading: 'blocking', // defer | module. можно также указать inject: 'body' скрипт будет в конце body но с defer
        }),
        new HtmlWebPackPlugin({
            // title: '....' // здесь можно указать title конкретной страницы
            template: './src/pug/product-card-hot-chocolate.pug',
            filename: './product-card-hot-chocolate.html',   // куда компилировать
            minify: {
              html: false // отключаем минификацию html, еще есть версия minify: false
            },
            scriptLoading: 'blocking', // defer | module. можно также указать inject: 'body' скрипт будет в конце body но с defer
        }),
        new HtmlWebPackPlugin({
            // title: '....' // здесь можно указать title конкретной страницы
            template: './src/pug/product-card-milk-system-cleaner.pug',
            filename: './product-card-milk-system-cleaner.html',   // куда компилировать
            minify: {
              html: false // отключаем минификацию html, еще есть версия minify: false
            },
            scriptLoading: 'blocking', // defer | module. можно также указать inject: 'body' скрипт будет в конце body но с defer
        }),
        new HtmlWebPackPlugin({
            // title: '....' // здесь можно указать title конкретной страницы
            template: './src/pug/product-card-t-short.pug',
            filename: './product-card-t-short.html',   // куда компилировать
            minify: {
              html: false // отключаем минификацию html, еще есть версия minify: false
            },
            scriptLoading: 'blocking', // defer | module. можно также указать inject: 'body' скрипт будет в конце body но с defer
        }),
        new HtmlWebPackPlugin({
            // title: '....' // здесь можно указать title конкретной страницы
            template: './src/pug/product-card-broths.pug',
            filename: './product-card-broths.html',   // куда компилировать
            minify: {
              html: false // отключаем минификацию html, еще есть версия minify: false
            },
            scriptLoading: 'blocking', // defer | module. можно также указать inject: 'body' скрипт будет в конце body но с defer
        }),
        new HtmlWebPackPlugin({
            // title: '....' // здесь можно указать title конкретной страницы
            template: './src/pug/product-card-coffee-machines.pug',
            filename: './product-card-coffee-machines.html',   // куда компилировать
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
        new HtmlWebPackPlugin({
            // title: '....' // здесь можно указать title конкретной страницы
            template: './src/pug/brands.pug',
            filename: './brands.html',   // куда компилировать
            minify: {
              html: false // отключаем минификацию html, еще есть версия minify: false
            },
            scriptLoading: 'blocking', // defer | module. можно также указать inject: 'body' скрипт будет в конце body но с defer
        }),
        new HtmlWebPackPlugin({
            // title: '....' // здесь можно указать title конкретной страницы
            template: './src/pug/products-list.pug',
            filename: './products-list.html',   // куда компилировать
            minify: {
              html: false // отключаем минификацию html, еще есть версия minify: false
            },
            scriptLoading: 'blocking', // defer | module. можно также указать inject: 'body' скрипт будет в конце body но с defer
        }),
        new HtmlWebPackPlugin({
            // title: '....' // здесь можно указать title конкретной страницы
            template: './src/pug/delivery.pug',
            filename: './delivery.html',   // куда компилировать
            minify: {
              html: false // отключаем минификацию html, еще есть версия minify: false
            },
            scriptLoading: 'blocking', // defer | module. можно также указать inject: 'body' скрипт будет в конце body но с defer
        }),
        new HtmlWebPackPlugin({
            // title: '....' // здесь можно указать title конкретной страницы
            template: './src/pug/payment.pug',
            filename: './payment.html',   // куда компилировать
            minify: {
              html: false // отключаем минификацию html, еще есть версия minify: false
            },
            scriptLoading: 'blocking', // defer | module. можно также указать inject: 'body' скрипт будет в конце body но с defer
        }),
        new HtmlWebPackPlugin({
            // title: '....' // здесь можно указать title конкретной страницы
            template: './src/pug/about-us.pug',
            filename: './about-us.html',   // куда компилировать
            minify: {
              html: false // отключаем минификацию html, еще есть версия minify: false
            },
            scriptLoading: 'blocking', // defer | module. можно также указать inject: 'body' скрипт будет в конце body но с defer
        }),
        new HtmlWebPackPlugin({
            // title: '....' // здесь можно указать title конкретной страницы
            template: './src/pug/contacts.pug',
            filename: './contacts.html',   // куда компилировать
            minify: {
              html: false // отключаем минификацию html, еще есть версия minify: false
            },
            scriptLoading: 'blocking', // defer | module. можно также указать inject: 'body' скрипт будет в конце body но с defer
        }),
        new HtmlWebPackPlugin({
            // title: '....' // здесь можно указать title конкретной страницы
            template: './src/pug/exchange-and-refund.pug',
            filename: './exchange-and-refund.html',   // куда компилировать
            minify: {
              html: false // отключаем минификацию html, еще есть версия minify: false
            },
            scriptLoading: 'blocking', // defer | module. можно также указать inject: 'body' скрипт будет в конце body но с defer
        }),
        new HtmlWebPackPlugin({
            // title: '....' // здесь можно указать title конкретной страницы
            template: './src/pug/favorites.pug',
            filename: './favorites.html',   // куда компилировать
            minify: {
              html: false // отключаем минификацию html, еще есть версия minify: false
            },
            scriptLoading: 'blocking', // defer | module. можно также указать inject: 'body' скрипт будет в конце body но с defer
        }),
        new HtmlWebPackPlugin({
            // title: '....' // здесь можно указать title конкретной страницы
            template: './src/pug/requisites.pug',
            filename: './requisites.html',   // куда компилировать
            minify: {
              html: false // отключаем минификацию html, еще есть версия minify: false
            },
            scriptLoading: 'blocking', // defer | module. можно также указать inject: 'body' скрипт будет в конце body но с defer
        }),
        new HtmlWebPackPlugin({
            // title: '....' // здесь можно указать title конкретной страницы
            template: './src/pug/404.pug',
            filename: './404.html',   // куда компилировать
            minify: {
              html: false // отключаем минификацию html, еще есть версия minify: false
            },
            scriptLoading: 'blocking', // defer | module. можно также указать inject: 'body' скрипт будет в конце body но с defer
        }),
        new HtmlWebPackPlugin({
            // title: '....' // здесь можно указать title конкретной страницы
            template: './src/pug/loyalty-program.pug',
            filename: './loyalty-program.html',   // куда компилировать
            minify: {
              html: false // отключаем минификацию html, еще есть версия minify: false
            },
            scriptLoading: 'blocking', // defer | module. можно также указать inject: 'body' скрипт будет в конце body но с defer
        }),
        new HtmlWebPackPlugin({
            // title: '....' // здесь можно указать title конкретной страницы
            template: './src/pug/basket.pug',
            filename: './basket.html',   // куда компилировать
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
            
            { from: 'src/svg/brand-logo-althaus.svg', to: 'svg/' },
            { from: 'src/svg/brand-logo-bonomi.svg', to: 'svg/' },
            { from: 'src/svg/brand-logo-chocolate.svg', to: 'svg/' },
            { from: 'src/svg/brand-logo-clavis.svg', to: 'svg/' },
            { from: 'src/svg/brand-logo-danesi-caffe.svg', to: 'svg/' },
            { from: 'src/svg/brand-logo-impassion-coffee.svg', to: 'svg/' },
            { from: 'src/svg/brand-logo-kaffit.svg', to: 'svg/' },
            { from: 'src/svg/brand-logo-lavazza.svg', to: 'svg/' },
            { from: 'src/svg/brand-logo-monin.svg', to: 'svg/' },
            { from: 'src/svg/brand-logo-niktea.svg', to: 'svg/' },
            { from: 'src/svg/brand-logo-oasis.svg', to: 'svg/' },
            { from: 'src/svg/brand-logo-r18.svg', to: 'svg/' },
            { from: 'src/svg/brand-logo-rancilio.svg', to: 'svg/' },
            { from: 'src/svg/brand-logo-sweet-shot.svg', to: 'svg/' },
            { from: 'src/svg/brand-logo-vedrenne.svg', to: 'svg/' },
            { from: 'src/svg/brand-logo-wmf.svg', to: 'svg/' },

            { from: 'src/files/price.pdf', to: 'files/' },
            
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