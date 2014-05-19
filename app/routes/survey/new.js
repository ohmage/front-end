export default Ember.Route.extend({
  model: function() {
    return this.store.createRecord('survey');
  },
  renderTemplate: function() {
    this.render('survey.edit');
  },
  actions: {
    cancel: function(model) {
      this.transitionTo('home');
    }
  }
});