import Edit from 'ohmage/routes/survey/edit'

export default Edit.extend({
  model: function() {
    return this.store.createRecord('survey');
  },

  /**
    Use the edit template for rendering
  */
  renderTemplate: function(controller) {
    this.render('survey.edit', {
      controller: controller
    });
  },

  /**
    Add the new survey to the list of the users surveys
  */
  setModel: function(model) {
    var user = this.store.find('person', this.get('session').content.user_id);

    user.then(function(user){
      user.get('surveys').pushObject(model);
      user.notifyPropertyChange('surveys');
    });

    this._super(model);
  },

  actions: {
    cancel: function(model) {
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