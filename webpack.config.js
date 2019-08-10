const path = require(`path`);

module.exports = {
  mode: `development`,
  entry: `./src/main.js`,
  output: {
    // eslint-disable-next-line no-undef
    path: path.resolve(__dirname, `public`),
    filename: `bundle.js`
  },
  devtool: `source-map`,
  devServer: {
    // eslint-disable-next-line no-undef
    contentBase: path.join(__dirname, `public`),
    port: 3000,
    publicPath: `http://localhost:3000`,
    open: true,
    watchContentBase: true
  }
};
