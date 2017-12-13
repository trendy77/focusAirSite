const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCss = new ExtractTextPlugin('[name].css');
const Dotenv = require('dotenv-webpack');

const config = {
     entry: [
	 'materialize-loader!materialize.config.js',
'./src/app.js'],
     output: {
         path: path.resolve(__dirname, 'bin'),
         filename: 'app.bundle.js'
     },
	  watch: true,
    externals: {
        // require("jquery") is external and available
        //  on the global var jQuery
        "jquery": "jQuery"
    },
   module: {
    rules: [
		{test: /\.(png|jpg|gif)$/, use: [
          {
            loader: 'file-loader',
            options: {
			name: '[path][name].[ext]',
			publicPath: 'assets/' 
			}
		  }
        ]
      }
    ]
  },
  module: {
	  preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'jshint-loader'

      }
   ],
   loaders: [
     {
       test: /\.es6$/,
       exclude: /node_modules/,
       loader: 'babel-loader',
       query: {
          cacheDirectory: true, 
          presets: ['react', 'es2015'] 
       }
      }
   ]
  },
  module: {
  rules: [
    {
      test: /\.(jpe?g|png|gif|svg)$/i,
      use: [
        "url-loader?limit=10000",
        "img-loader"
      ]
    }
  ]
},
module: {
    loaders: [
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' }
    ]
  },
    module: {
        rules: [
		{
			test: /.css$/,
            use: ExtractTextPlugin.extract({
		    fallback: "style-loader",
			use: "css-loader",
			publicPath: "dist"
			})
        }]
    },
	resolve: {
   extensions: ['.js', '.es6']
 },
   plugins: [
     new Dotenv({
      path: 'src/.env', // Path to .env file (this is the default) 
      safe: true // load .env.example (defaults to "false" which does not use dotenv-safe) 
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({template: './index.html'}),
	new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            output: {
                comments: false
            },
            compress: {
                warnings: true
            }
        })
  ]
};
 
module.exports = config;