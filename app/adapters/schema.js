import ApplicationAdapter from 'ohmage/adapters/application';
import SchemaMixin from "ohmage/mixins/schema";

export default ApplicationAdapter.extend(SchemaMixin, {

  find: function(store, type, id) {
    var parseId = this.parseId(id);
    if(parseId.schema_version) {
      return this.findSchemaVersion(store, type, parseId.schema_id, parseId.schema_version);
    } else {
      var self = this;
      return this.ajax(this.buildURL(type.typeKey, id), 'GET').then(function(response) {
        // Just return the max version
        return self.findSchemaVersion(store, type, id, Math.max.apply(Math, response));
      });
    }
  },

  findSchemaVersion: function(store, type, id, version) {
    return this.ajax(this.buildVersionURL(type.typeKey, id, version), 'GET');
  },

  buildVersionURL: function(type, id, version) {
    return this.buildURL(type, id) + '/' + version;
  },

  /**
    Builds a url for this schema, will always coerce the id to be the schema_id
  */
  buildURL: function(type, id) {
    return this._super(type, id ? this.parseId(id).schema_id : null);
  },

  updateId: function(record, data) {
    this.buildId(data);
    this._super(record, data);
  },

  /**
    For all calls we should return the composite id
  */
  ajax: function(url, type, hash) {
    var self = this;
    return this._super(url, type, hash).then(function(json){
      self.buildId(json);
      return json;
    });;
  },
});