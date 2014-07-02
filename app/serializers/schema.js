import ApplicationSerializer from "./application";
import Ember from "ember";

export default ApplicationSerializer.extend({

  ignoreKeys: ['owner', 'schema_id', 'schema_version', 'id'],

  // TODO: maybe use serializeAttribute? or does that change what is saved
  serializeAttribute: function(record, json, key, attribute) {
    // skip ignored keys
    if(Ember.$.inArray(key, this.ignoreKeys) === -1) {
      this._super(record, json, key, attribute);
    }
  },

});