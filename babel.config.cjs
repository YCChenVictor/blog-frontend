 
module.exports = {
  babelrc: false,
  presets: ['@babel/preset-env', '@babel/preset-react'],
  env: {
    test: {
      plugins: ['@babel/plugin-transform-modules-commonjs']
    }
  }
};
