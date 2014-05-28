import ApplicationAdapter from 'ohmage/adapters/application';
import SchemaMixin from "ohmage/mixins/schema";

export default ApplicationAdapter.extend(SchemaMixin, {
  buildURL: function(type, id) {
    return this._super(type, id) + '/current';
  },

  find: function(store, type, id) {
    var self = this;
    // Go through and create the unique id for all schemas
    // TODO: figure out a way to make this work for all varients of find
    return this._super(store, type, id).then(function(json) {
      json.ohmlets.forEach(function(ohmlet) {
        ohmlet.surveys.forEach(self.buildId);
        ohmlet.streams.forEach(self.buildId);
      });

      json.surveys.forEach(self.buildId);
      json.streams.forEach(self.buildId);
      return json;
    });
  },
});