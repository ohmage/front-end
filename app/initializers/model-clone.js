export default {
  name: 'model-clone',
  initialize: function() {
    DS.Model.reopen({
      clone: function() {
        var root = this.constructor.typeKey;
        var newRecord = this.store.createRecord(root);

        var attributeKeys = this.get('constructor.attributes.keys.list');
        newRecord.setProperties(this.getProperties(attributeKeys));
        return newRecord;
      }
    });
  }
};