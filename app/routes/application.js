export default Ember.Route.extend(Ember.SimpleAuth.ApplicationRouteMixin, {
  actions: {
    error: function(reason, transition) {
      if (reason.status === 401) {
        transition.send('authorizationFailed');
      }
      return true;
    }
  }
});