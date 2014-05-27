import SchemaCloneRoute from 'ohmage/routes/schema/clone';

export default SchemaCloneRoute.extend({
  model: function(params) {
    return this.store.find('survey', this.buildId(params));
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