export default Ember.Route.extend({
  renderTemplate: function(error) {
    console.log(error.get('stack'));
    this.render('404');
  },
});