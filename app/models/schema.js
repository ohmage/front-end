import DS from "ember-data";
import Ember from "ember";

export default DS.Model.extend({

  schema_id: DS.attr('string'),
  schema_version: DS.attr(),
  name: DS.attr('string'),
  description: DS.attr('string'),
  owner: DS.attr('string'),

  ownedByCurrentUser: function() {
    return this.get('owner') === this.container.lookup('route:application').session.content.user_id;
  }.property('owner'),

  isLoaded: Ember.K,

  clone: function() {
    var newRecord = this._super();
    newRecord.set('owner', null);
    newRecord.set('schema_id', null);
    newRecord.set('schema_version', null);
    return newRecord;
  },
});