var ApplicationSerializer = DS.ActiveModelSerializer.extend(DS.EmbeddedRecordsMixin, {

  keyForRelationship: function(key, kind) {
    key = Ember.String.decamelize(key);
    if (kind === "belongsTo") {
      return key + "_id";
    } else if (kind === "hasMany") {
     return key + "_ids";
    } else {
      return key;
   }
  },

  keyForAttribute: function(attr) {
    return attr;
  },

  attrs: {
    ohmlets: {embedded: 'always'},
    surveys: {embedded: 'always'},
    streams: {embedded: 'always'}
  },

  extractSingle: function(store, primaryType, payload, recordId, requestType) {
   var obj = {};
   obj[primaryType.typeKey] = payload;

   return this._super(store, primaryType, obj, recordId, requestType);
  },

  extractArray: function(store, type, payload, id, requestType) {
    var obj = {};
    obj[type.typeKey] = payload;
    return this._super(store, type, obj, id, requestType);
  },

  serializeIntoHash: function(hash, type, record, options) {
    Ember.merge(hash, this.serialize(record, options));
  },

  serializeAttribute: function(record, json, key, attribute) {
    // Only serialize non-null attributes
    if(record.get(key)) {
      this._super(record, json, key, attribute);
    }
  },
});

export default ApplicationSerializer;