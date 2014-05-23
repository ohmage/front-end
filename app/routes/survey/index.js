import IndexSchemaRoute from 'ohmage/routes/schema/index'

export default IndexSchemaRoute.extend({
  model: function(params) {
    return this.store.find('survey', params.survey_id);
  },
});