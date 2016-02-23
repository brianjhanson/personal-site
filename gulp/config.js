//
//   Config
//
//////////////////////////////////////////////////////////////////////

module.exports = {

  proxy: 'http://brianhanson.dev',

  paths: {
    styleSrc: 'src/styles/',
    styleDist: 'public_html/dist/styles/',

    scriptSrc: 'src/scripts/',
    scriptDist: 'public_html/dist/scripts/',

    templateSrc: 'craft/templates/',
    templateDist: 'templates/',

    imageSrc: 'src/images/',
    imageDist: 'public_html/dist/images/',

    fontSrc: 'src/fonts',
    fontDist: 'public_html/dist/fonts'
  },

  scripts: {
    entryFiles: [
      'main'
    ],

    aliases: {
    }
  }
};
