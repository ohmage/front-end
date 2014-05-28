/**
  Set a cloned version of the model on the controller
*/
export default Ember.Mixin.create({
  setupController: function (controller, model) {
    this._super(controller, model.clone());
  },
});