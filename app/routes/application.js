export default Ember.Route.extend(Ember.SimpleAuth.ApplicationRouteMixin, {
  actions: {
    sessionAuthenticationFailed: function(error) {
      this.send('showError', error);
    },
    showError: function(error) {
      var controller = this.controllerFor('application');
      controller.set('success', null);
      controller.set('error', error || "Unknown Error");
    },
    showSuccess: function(success) {
      var controller = this.controllerFor('application');
      controller.set('success', success);
      controller.set('error', null);
    }
  }
});