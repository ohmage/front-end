import Ember from "ember";

export default Ember.Mixin.create({
  parseId: function(id) {
    var values = id.split('/');
    return {
      schema_id: values[0],
      schema_version: values[1]
    };
  },

  buildId: function(schema) {
    if(schema.schema_version) {
      schema.id=schema.schema_id + "/" + schema.schema_version;
    } else {
      schema.id=schema.schema_id;
    }
    return schema.id;
  },
});