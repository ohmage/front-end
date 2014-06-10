export default Ember.View.extend({
  didInsertElement: function() {
    Ember.run.scheduleOnce('afterRender', this, function() {
      $('#side-menu').metisMenu();
    });
  }
});