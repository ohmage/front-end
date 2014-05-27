export default Ember.Mixin.create({
  parseId: function(id) {
    var values = id.split('/');
    return {
      schema_id: values[0],
      schema_version: values[1]
    };
  },

  buildId: function(schema) {
    schema.id=schema.schema_id + "/" + schema.schema_version;
    return schema.id;
  },
});