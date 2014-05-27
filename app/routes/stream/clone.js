import SchemaCloneRoute from 'ohmage/routes/schema/clone';

export default SchemaCloneRoute.extend({
  model: function(params) {
    return this.store.find('stream', this.buildId(params));
  },

  /**
    Use the edit template for rendering
  */
  renderTemplate: function(controller) {
    this.render('stream.edit', {
      controller: controller
    });
  },

  addModelToUserList: function(user, model) {
    user.get('streams').pushObject(model);
    user.notifyPropertyChange('streams');
  },
});