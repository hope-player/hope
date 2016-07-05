module.exports = {
  entry: './src/index.jsx',
  output: {
    path: './dist',
    publicPath: '/src/',
    filename: 'app.js',
  },
  cache: true,
  debug: true,
  devtool: 'source-map',
  stats: {
    colors: true,
    reasons: true,
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};
