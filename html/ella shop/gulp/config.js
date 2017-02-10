var timestamp = new Date().valueOf();
var bower = 'bower_components/';
global.SRC_FOLDER = 'app';
global.BUILD_FOLDER = 'build';
global.isProduction = process.env.ENV === 'prod';

global.config = {
  scripts: [
    bower + 'jquery/dist/jquery.js',
    bower + 'bootstrap-sass/assets/javascripts/bootstrap.js',
    'app/scripts/main.js'
  ],
  filenames: {
    build: {
      style: 'styles.css',
      script: 'script.js'
    },
    release: {
      style: 'styles_' + timestamp + '.min.css',
      script: 'scripts_' + timestamp + '.min.js'
    }
  }
}
