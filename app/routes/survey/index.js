export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('survey', params.survey_id);
  },

  /**
    This will check to make sure the model has survey items
    before it is shown. If it doesn't it will go to the
    network.
  */
  setupController: function (controller, model) {
    if(!model.get('survey_items')) {
      model.reload().then(function(model) {
        controller.set("model", model);
      })
    }
  }
});