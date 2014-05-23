import ApplicationAdapter from 'ohmage/adapters/application';

export default ApplicationAdapter.extend({

  find: function(store, type, id) {
    var self = this;
    return this.ajax(this.buildURL(type.typeKey, id), 'GET').then(function(response) {
      // Just return the max version
      return self.ajax(self.buildURL(type.typeKey, id) + '/' + Math.max.apply(Math, response), 'GET');
    });
  },

  /**
    This will check to make sure the model that is being updated
    belongs to the user. If it doesn't it will remove the identifying
    information and it will be treated like a new record.
  */
  updateRecord: function(store, type, record) {
    var session = this.container.lookup('route:application').session;

    if(record.get('owner') !== session.content.user_id) {
      record.set("id", undefined);
      record.set("owner", undefined);
    }

    return this._super(store, type, record);
  },
});