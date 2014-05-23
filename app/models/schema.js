export default DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  owner: DS.attr('string'),

  ownedByCurrentUser: function() {
    return this.get('owner') === this.container.lookup('route:application').session.content.user_id;
  }.property('owner'),
  isLoaded: Em.K,
  clone: function() {
    var newRecord = this._super();
    newRecord.set('owner', null);
    return newRecord;
  },
});