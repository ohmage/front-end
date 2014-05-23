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
    var self = this;
    if(model.get('id') && !model.get('survey_items')) {
      model.reload().then(function(model) {
        self.setModel(model);
      })
    } else {
      this.setModel(model);
    }
  },

  setModel: function(model) {
    this.controller.set("model", model);
  }
});