import Edit from 'ohmage/routes/schema/edit';

export default Edit.extend({

  /**
    Add the new survey to the list of the users surveys
  */
  setModel: function(model) {
    var user = this.store.find('person', this.get('session').content.user_id);
    var self = this;
    user.then(function(user){
      self.addModelToUserList(user, model);
    });

    this._super(model);
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
      this._super();
    }
  }
});