var timestamp = new Date().valueOf();
var bower = 'bower_components/';

global.config = {
  scripts: [
    bower + 'jquery/dist/jquery.js',
    bower + 'jquery.scrollex/jquery.scrollex.js',
    bower + 'jquery-scrolly/jquery.scrolly.js',
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
