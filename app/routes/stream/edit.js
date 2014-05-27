import SchemaEditRoute from 'ohmage/routes/schema/edit'

export default SchemaEditRoute.extend({
  model: function(params) {
    return this.store.find('stream', this.buildId(params));
  },
  actions: {
    cancel: function(model) {
      this.transitionTo('stream', model);
    }
  },
});