export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('survey', params.survey_id).then(function(record) {
      return record.reload();
    })
  }
});