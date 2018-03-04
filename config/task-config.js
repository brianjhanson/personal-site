const path = require('path');
const envPath = path.resolve(__dirname, '../.env');
const envVars = require('dotenv').config({ path: envPath });
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');

if (envVars.error) {
  throw envVars.error;
}

module.exports = {
  html: false,
  images: true,
  fonts: true,
  static: false,
  svgSprite: true,
  ghPages: false,
  stylesheets: true,
  clean: false,

  javascripts: {
    entry: {
      app: ['./app.js']
    },
    publicPath: 'static/scripts',
    plugins: (webpack) => {
      return [
        new WatchMissingNodeModulesPlugin(path.resolve('node_modules'))
      ];
    },
    loaders: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, '../src/scripts'),
        enforce: 'pre',
        use: [
          {
            loader: 'eslint-loader',
            options: {
              // Pass the formatter:
              formatter: eslintFormatter
            }
          }
        ]
      }
    ]
  },

  browserSync: {
    open: false,
    notify: false,
    files: ['templates/**/*.html'],
    proxy: {
      target: envVars.parsed.SITE_URL || 'localhost'
    }
  },

  production: {
    rev: true
  }
};
