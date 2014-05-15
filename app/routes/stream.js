export default Ember.Route.extend({
 model: function(params) {
   return this.store.find('stream', params.schema_id);
  }
});