import SchemaEditRoute from 'ohmage/routes/schema/edit'

export default SchemaEditRoute.extend({
  actions: {
    cancel: function(model) {
      this.transitionTo('survey', model);
    }
  },
});