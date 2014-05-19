import ApplicationAdapter from 'ohmage/adapters/application';

export default ApplicationAdapter.extend({

  find: function(store, type, id) {
    var self = this;
    return this.ajax(this.buildURL(type.typeKey, id), 'GET').then(function(response) {
      // Just return the max version
      return self.ajax(self.buildURL(type.typeKey, id) + '/' + Math.max.apply(Math, response), 'GET');
    });
  },

});