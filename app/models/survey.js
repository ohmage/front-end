export default DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  owner: DS.attr('string'),
  survey_items: DS.attr('raw'),
  ownedByCurrentUser: function() {
    return this.get('owner') === this.container.lookup('route:application').session.content.user_id;
  }.property('owner'),
  clone: function() {
    var newRecord = this.store.createRecord('survey');

    var attributeKeys = this.get('constructor.attributes.keys.list');
    newRecord.setProperties(this.getProperties(attributeKeys));
    newRecord.set('owner', null);
    return newRecord;
  }
});