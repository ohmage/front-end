export default {
  name: 'model-clone',
  initialize: function(container, application) {
    DS.Model.reopen({
      clone: function() {
        var class_type = this.constructor;
        var root = class_type.toString().split(":")[1];
        var newRecord = this.store.createRecord(root);

        var attributeKeys = this.get('constructor.attributes.keys.list');
        newRecord.setProperties(this.getProperties(attributeKeys));
        return newRecord;
      }
    });
  }
}