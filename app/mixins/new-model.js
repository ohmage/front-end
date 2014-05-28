/**
  Sets up the sidebar to include the new item using `addModelToUserList`
*/
export default Ember.Mixin.create({

  /**
    Add the new survey to the list of the users surveys
  */
  setupController: function (controller, model) {
    this._super(controller, model);

    var user = this.store.find('person', this.get('session').content.user_id);
    var self = this;
    user.then(function(user){
      self.addModelToUserList(user, model);
    });
  },

  /**
    The model should be added to the correct list on the user
  */
  addModelToUserList: Em.K,

  actions: {
    cancel: function() {
      this.transitionTo('home');
    },

    /**
      Remove the survey from the users survey since it was cancelled
    */
    cleanup: function() {
      var user = this.store.getById('person', this.get('session').content.user_id);
      user.rollback();
      return true;
    }
  }
});