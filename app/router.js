import Ember from 'ember';

var Router = Ember.Router.extend({
  location: OhmageENV.locationType
});

Router.map(function() {
  this.resource('home', { path: '/' }, function() {
    this.resource('ohmlet', { path: '/ohmlet/:ohmlet_id' });

    this.resource('survey', function() {
      this.route('new');
      this.route('index_newest', { path: '/:schema_id' });
      this.route('index', { path: '/:schema_id/:schema_version' });
      this.route('edit', { path: '/:schema_id/:schema_version/edit' });
      this.route('clone', { path: '/:schema_id/:schema_version/clone' });
    });

    this.resource('stream', function() {
      this.route('new');
      this.route('index_newest', { path: '/:schema_id' });
      this.route('index', { path: '/:schema_id/:schema_version' });
      this.route('edit', { path: '/:schema_id/:schema_version/edit' });
      this.route('clone', { path: '/:schema_id/:schema_version/clone' });
    });
  });
  this.route('login');
  this.route('register');
  this.route('activation', { path: '/activation/:activation_id'});
  this.route('browse');
  this.route('styleguide');
  this.route("404", { path: "*path"});
});

export default Router;
