export default DS.Model.extend({
  email: DS.attr('string'),
  fullName: DS.attr('string'),
  password: DS.attr('string'),
  ohmlets: DS.hasMany('ohmlet'),
  streams: DS.hasMany('stream'),
  surveys: DS.hasMany('survey'),
  allSurveys: function() {
    var all = [];

    this.get('surveys').forEach(function(survey) {
      all.push(survey);
    });

    this.get('ohmlets').forEach(function(ohmlet) {
      ohmlet.get('surveys').forEach(function(survey) {
        all.push(survey);
      });
    });
    return all;
  }.property('surveys', 'ohmlets'),
});