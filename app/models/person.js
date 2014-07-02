import DS from "ember-data";
import Ember from "ember";

var filterNewest = function (list) {
  return list.reduce(function(ret, item) {
    var old = ret.findBy('schema_id', item.get('schema_id'));
    if(!old) {
      ret.push(item);
    } else if(old.get('schema_version') < item.get('schema_version')) {
      ret.removeObject(old);
      ret.push(item);
    }
    return ret;
  }, Ember.A());
};

export default DS.Model.extend({
  email: DS.attr('string'),
  fullName: DS.attr('string'),
  password: DS.attr('string'),
  ohmlets: DS.hasMany('ohmlet'),
  streams: DS.hasMany('stream'),
  surveys: DS.hasMany('survey'),

  schemaSortProperties: ['name'],

  sortedOhmlets: Ember.computed.sort('ohmlets', 'schemaSortProperties'),

  latestSurveys: function() {
    var all = [];

    this.get('surveys').forEach(function(survey) {
      all.push(survey);
    });

    this.get('ohmlets').forEach(function(ohmlet) {
      ohmlet.get('surveys').forEach(function(survey) {
        all.push(survey);
      });
    });
    return filterNewest(all);
  }.property('surveys', 'ohmlets'),

  sortedSurveys: Ember.computed.sort('latestSurveys', 'schemaSortProperties'),

  latestStreams: function() {
    var all = [];

    this.get('streams').forEach(function(stream) {
      all.push(stream);
    });

    this.get('ohmlets').forEach(function(ohmlet) {
      ohmlet.get('streams').forEach(function(stream) {
        all.push(stream);
      });
    });
    return filterNewest(all);
  }.property('streams', 'ohmlets'),

  sortedStreams: Ember.computed.sort('latestStreams', 'schemaSortProperties'),
});