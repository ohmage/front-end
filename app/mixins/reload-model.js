import Ember from "ember";

/**
  Checks that the model is completely loaded before setting it on the
  controller. This happens when the item is partially loaded (ie. it
  was shown in a list).
*/
export default Ember.Mixin.create({
  setupController: function (controller, model) {
    var self = this;
    if(model.get('id') && !model.isLoaded()) {
      model.reload().then(function(model) {
        self.controller.set("model", model);
      });
    } else {
      this.controller.set("model", model);
    }
  },
});