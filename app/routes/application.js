export default Ember.Route.extend(Ember.SimpleAuth.ApplicationRouteMixin, {
  actions: {
    sessionAuthenticationFailed: function(error) {
      this.transitionTo('login');
      this.controllerFor('login').set('error', "Authentication Failed. You have been logged out.");
    },
  }
});