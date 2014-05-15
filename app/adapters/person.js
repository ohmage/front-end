import ApplicationAdapter from 'ohmage/adapters/application';

export default ApplicationAdapter.extend({
  buildURL: function(type, id) {
    return this._super(type, id) + '/current';
  }
});