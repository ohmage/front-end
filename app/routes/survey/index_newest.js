import Index from 'ohmage/routes/survey/index';

export default Index.extend({
  renderTemplate: function(controller) {
    this.render('survey.index', {
      controller: controller
    });
  },
});