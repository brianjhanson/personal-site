const path = require('path');
const envPath = path.resolve(__dirname, '../.env');
const envVars = require('dotenv').config({path: envPath});

if (envVars.error) {
  throw envVars.error;
}

module.exports = {
  html        : false,
  images      : true,
  fonts       : true,
  static      : false,
  svgSprite   : true,
  ghPages     : false,
  stylesheets : true,
  clean: false,

  javascripts: {
    entry: {
      app: ['./app.js'],
    },
    publicPath: 'static/scripts'
  },

  browserSync: {
    open: false,
    notify: false,
    proxy: {
      target: envVars.parsed.SITE_URL || 'localhost'
    }
  },

  production: {
    rev: true
  }
}
