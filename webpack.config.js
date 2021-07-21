const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ] 
  },
  devServer: {
    contentBase: [path.join(__dirname, 'dist'), path.join(__dirname, 'src')],
    port: 8080,
    open: true,
    inline: true,
    hot: true
  },
};