import SchemaCloneRoute from 'ohmage/routes/schema/clone';

export default SchemaCloneRoute.extend({
  model: function(params) {
    return this.store.find('stream', params.stream_id);
  },

  /**
    Use the edit template for rendering
  */
  renderTemplate: function(controller) {
    this.render('stream.edit', {
      controller: controller
    });
  },
});