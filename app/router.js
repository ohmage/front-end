var Router = Ember.Router.extend({
  location: ENV.locationType
});

Router.map(function() {
  this.resource('home', { path: '/' }, function() {
    this.resource('ohmlet', { path: '/ohmlet/:ohmlet_id' });

    this.resource('survey', function() {
      this.route('new');
      this.route('index', { path: '/:survey_id' });
      this.route('edit', { path: '/:survey_id/edit' });
      this.route('clone', { path: '/:survey_id/clone' });
    });

    this.resource('stream', function() {
      this.route('new');
      this.route('index', { path: '/:stream_id' });
      this.route('edit', { path: '/:stream_id/edit' });
      this.route('clone', { path: '/:stream_id/clone' });
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
