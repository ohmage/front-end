import ApplicationSerializer from "./application";

export default ApplicationSerializer.extend({
    primaryKey: 'schema_id',

    serializeAttribute: function(record, json, key, attribute) {
      // skip owner
      if('owner' !== key) {
        this._super(record, json, key, attribute);
      }
    },
});