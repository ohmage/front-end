import SchemaNewRoute from 'ohmage/routes/schema/new'

export default SchemaNewRoute.extend({
  model: function() {
    return this.store.createRecord('stream');
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