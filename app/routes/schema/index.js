import SchemaMixin from 'ohmage/mixins/schema';

export default Ember.Route.extend(SchemaMixin, {
  /**
    This will check to make sure the model has survey items
    before it is shown. If it doesn't it will go to the
    network.
  */
  setupController: function (controller, model) {
    var self = this;
    if(model.get('id') && !model.isLoaded()) {
      model.reload().then(function(model) {
        self.setModel(model);
      });
    } else {
      this.setModel(model);
    }
  },

  setModel: function(model) {
    this.controller.set("model", model);
  }
});