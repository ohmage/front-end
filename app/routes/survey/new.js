import SchemaNewRoute from 'ohmage/routes/schema/new';

export default SchemaNewRoute.extend({
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

  addModelToUserList: function(user, model) {
    user.get('surveys').pushObject(model);
    user.notifyPropertyChange('surveys');
  },
});