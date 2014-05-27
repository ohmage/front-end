import ApplicationSerializer from "./application";

export default ApplicationSerializer.extend({

  ignoreKeys: ['owner', 'schema_id', 'schema_version', 'id'],

  // TODO: maybe use serializeAttribute? or does that change what is saved
  serializeAttribute: function(record, json, key, attribute) {
    // skip ignored keys
    if($.inArray(key, this.ignoreKeys) === -1) {
      this._super(record, json, key, attribute);
    }
  },

});