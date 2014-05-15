export default Ember.Route.extend({
 model: function(params) {
   return this.store.find('survey', params.schema_id);
  }
});