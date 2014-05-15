export default DS.Model.extend({
  email: DS.attr('string'),
  fullName: DS.attr('string'),
  password: DS.attr('string'),
  ohmlets: DS.hasMany('ohmlet'),
  streams: DS.hasMany('stream'),
  surveys: DS.hasMany('survey')
});