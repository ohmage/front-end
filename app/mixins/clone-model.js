/**
  Set a cloned version of the model on the controller
*/
export default Ember.Mixin.create({

  setupController: function (controller, model) {
    var self = this;
    if(model.get('id') && !model.isLoaded()) {
      model.reload().then(function(model) {
        self.controller.set("model", model.clone());
      });
    } else {
      this.controller.set("model", model.clone());
    }
  },

  // For now we need to make sure the model is up to date and then clone it
  // setupController: function (controller, model) {
  //   this._super(controller, model.clone());
  // },
});