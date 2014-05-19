export default Ember.Route.extend({
  actions: {
    cancel: function(model) {
      this.transitionTo('survey', model);
    }
  }
});