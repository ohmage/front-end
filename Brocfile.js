/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp({
  name: require('./package.json').name,

  minifyCSS: {
    enabled: true,
    options: {}
  },

  getEnvJSON: require('./config/environment')
});

// Use this to add additional libraries to the generated output files.
app.import('vendor/ember-data/ember-data.js');

// If the library that you are including contains AMD or ES6 modules that
// you would like to import into your application please specify an
// object with the list of modules as keys along with the exports of each
// module as its value.
app.import('vendor/ic-ajax/dist/named-amd/main.js', {
  'ic-ajax': [
    'default',
    'defineFixture',
    'lookupFixture',
    'raw',
    'request',
  ]
});

app.import('vendor/ember-simple-auth/ember-simple-auth.js');

app.import('vendor/ember-simple-auth/ember-simple-auth-oauth2.js');

app.import('vendor/jsonlint/web/jsonlint.js');

app.import('vendor/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/collapse.js');
app.import('vendor/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/dropdown.js');
app.import('vendor/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/transition.js');
app.import('vendor/metisMenu/jquery.metisMenu.js');


var pickFiles = require('broccoli-static-compiler');
var aceEditor = pickFiles('vendor/ace-builds/src-min-noconflict/', {
    srcDir: '/',
    files: ['worker-json.js', 'ace.js', 'mode-json.js'],
    destDir: '/assets'
});

var mergeTrees = require('broccoli-merge-trees');
module.exports = mergeTrees([app.toTree(), aceEditor]);