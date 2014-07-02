import DS from "ember-data";

export default DS.RESTAdapter.extend({
  namespace: 'ohmage',
  ajax: function(url, type, hash) {
    if(type === 'PUT') {
      type = 'POST';
    }
    return this._super(url, type, hash);
  },
});