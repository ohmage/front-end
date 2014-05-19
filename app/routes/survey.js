export default Ember.Route.extend({
  actions: {
    update: function(model) {
      var self = this;
      model.save().then(function(saved) {
        self.transitionTo('survey', saved);
      });
    }
  }
});