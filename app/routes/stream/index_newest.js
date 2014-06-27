import Index from 'ohmage/routes/stream/index';

export default Index.extend({
  renderTemplate: function(controller) {
    this.render('stream.index', {
      controller: controller
    });
  },
});