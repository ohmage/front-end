import DS from "ember-data";

var RawTransform = DS.Transform.extend({
  deserialize: function(serialized) {
    return serialized ? JSON.stringify(serialized, null, "  ") : null;
  },
  serialize: function(deserialized) {
    return deserialized ? JSON.parse(deserialized) : null;
  }
});

export default {
  name: "raw-transform",

  initialize: function(container, application) {
    application.register('transform:raw', RawTransform);
  }
};