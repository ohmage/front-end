var Router = Ember.Router.extend({
  location: ENV.locationType
});

Router.map(function() {
  this.resource('home', function() {
    this.resource('ohmlet', { path: '/ohmlet/:ohmlet_id' });

    this.resource('survey', function() {
      this.route('new');
      this.route('index', { path: '/:survey_id' });
      this.route('edit', { path: '/:survey_id/edit' });
      this.route('clone', { path: '/:survey_id/clone' });
    });

    this.resource('stream', { path: '/streams/:schema_id' });
  });
  this.route('login');
  this.route('register');
  this.route('activation', { path: '/activation/:activation_id'});
  this.route('browse');
  this.route('styleguide');
  this.route("404", { path: "*path"});
});

export default Router;
