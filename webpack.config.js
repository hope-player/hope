module.exports = {
  entry: ['./src/index.jsx'],
  output: {
    path: './dist',
    publicPath: '/src/',
    filename: 'app.js',
  },
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
    },
    {
      test: /\.css$/,
      loader: 'style-loader!css-loader',
      exclude: /flexboxgrid/,
    },
    {
      test: /\.css$/,
      loader: 'style!css?modules',
      include: /flexboxgrid/,
    },
    {
      test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      loader: 'url-loader?limit=100000',
    },
    {
      test: /\.jpg$/,
      loader: 'file-loader',
    }],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};
