//
//   Config
//
//////////////////////////////////////////////////////////////////////

module.exports = {

  proxy: 'http://brianhanson.dev',

  paths: {
    styleSrc: 'src/styles/',
    styleDist: 'public/dist/styles/',

    scriptSrc: 'src/scripts/',
    scriptDist: 'public/dist/scripts/',

    templateSrc: 'craft/templates/',
    templateDist: 'templates/',

    imageSrc: 'src/images/',
    imageDist: 'public/dist/images/',

    fontSrc: 'src/fonts',
    fontDist: 'public/dist/fonts'
  },

  scripts: {
    entryFiles: [
      'main'
    ],

    aliases: {
    }
  }
};
