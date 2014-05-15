export default DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  streams: DS.hasMany('stream'),
  surveys: DS.hasMany('survey')
});