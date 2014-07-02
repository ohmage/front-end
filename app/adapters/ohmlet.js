import ApplicationAdapter from 'ohmage/adapters/application';
import SchemaMixin from "ohmage/mixins/schema";

export default ApplicationAdapter.extend(SchemaMixin, {
  find: function(store, type, id) {
    var self = this;
    // Go through and create the unique id for all schemas
    // TODO: figure out a way to make this work for all varients of find
    return this._super(store, type, id).then(function(json) {
      json.surveys.forEach(self.buildId);
      json.streams.forEach(self.buildId);
      return json;
    });
  },

  ajax: function(url, type, hash) {
    return this._super(url, type, hash).then(function(json){
      // Because of a bug in Ember Data and how the primary key is looked up for embedded records
      // We use the adapter to inject 'id' for an ajax request
      json.id = json.ohmlet_id;
      return json;
    });
  },
});