var Router = Ember.Router.extend({
  location: ENV.locationType
});

Router.map(function() {
  this.resource('home', function() {
    this.resource('ohmlet', { path: '/ohmlets/:ohmlet_id' });
    this.resource('survey', { path: '/surveys/:schema_id' });
    this.resource('stream', { path: '/streams/:schema_id' });
  });
  this.route('login');
  this.route('browse');
  this.route('styleguide');
});

export default Router;
