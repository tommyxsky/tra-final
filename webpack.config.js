const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
/*
  webpack sees every file as a module.
  How to handle those files is up to loaders.
  We only have a single entry point (a .js file) and everything is required from that js file
*/

// what to do with .js files
const javascript = {
  test: /\.(js)$/, // find all .js files
  use: [
    {
      loader: 'babel-loader',
      options: { presets: ['es2015'] },
    },
  ],
};

/*
  our postCSS loader which gets fed into the next loader
*/

const postcss = {
  loader: 'postcss-loader',
  options: {
    plugins() {
      return [autoprefixer({ browsers: 'last 3 versions' })];
    },
  },
};

// this is our sass/css loader. It handles files that are require('something.scss')
const styles = {
  test: /\.(scss)$/,
  // here we pass the options as query params b/c it's short.
  // remember above we used an object for each loader instead of just a string?
  // We don't just pass an array of loaders, we run them through the extract plugin so they can be outputted to their own .css file
  use: ExtractTextPlugin.extract([
    'css-loader?sourceMap',
    postcss,
    'sass-loader?sourceMap',
  ]),
};

// a plugin to compress JS
const uglify = new webpack.optimize.UglifyJsPlugin({
  // eslint-disable-line
  compress: { warnings: false },
});

// OK - now we stitch it together
const config = {
  entry: {
    // we only have 1 entry, but we stored entry in an object and
    // we can add more if we want
    App: './public/javascripts/tra-app.js',
  },
  // we're using sourcemaps
  // here is where we specify which kind of sourcemap to use
  devtool: 'source-map',
  // Once things are done, we kick it out to a file.
  output: {
    // path is a built in node module
    // __dirname is a variable from node that gives us the
    path: path.resolve(__dirname, 'public', 'dist'),
    // we can use "substitutions" in file names like [name] and [hash]
    // name will be `App` because that is what we used above in our entry
    filename: '[name].bundle.js',
  },

  // webpack sees everthing as modules
  // different loaders are responsible for different file types
  // We implement them here
  // Pass it the rules for our JS and our styles
  module: {
    rules: [javascript, styles],
  },
  // finally we pass it an array of our plugins
  // uncomment the very next line to uglify
  // plugins: [uglify]
  plugins: [
    // tell webpack to output our css to a separate file
    new ExtractTextPlugin('style.css'),
  ],
};
// webpack doesn't like some packages using a soon to be deprecated API.
// So we turn that error notification off
process.noDeprecation = true;

module.exports = config;
