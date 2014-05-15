var Router = Ember.Router.extend({
  location: ENV.locationType
});

Router.map(function() {
  this.route('home');
  this.route('login');
  this.route('browse');
  this.route('styleguide');
});

export default Router;
