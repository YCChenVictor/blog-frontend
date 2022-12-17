module.exports = {
  entry: "./webpack/entry.js",
  output: {
    path: "/assets/javascripts/",
    filename: "bundle.js"
  },
  module: {
  rules: [
    {
      test: /\.jsx?$/,
      exclude: /(node_modules)/,
      loader: "babel-loader",
      exclude: /node_modules/,
      options: {
        presets: [
          '@babel/preset-env',
          ["@babel/preset-react", {"runtime": "automatic"}]
        ],
        plugins: ['@babel/proposal-class-properties']
      }
    }
    ]
  },
  watch: true,
};
