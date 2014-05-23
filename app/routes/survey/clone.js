import SchemaCloneRoute from 'ohmage/routes/schema/clone';

export default SchemaCloneRoute.extend({
  model: function(params) {
    return this.store.find('survey', params.survey_id);
  },

  /**
    Use the edit template for rendering
  */
  renderTemplate: function(controller) {
    this.render('survey.edit', {
      controller: controller
    });
  },
});