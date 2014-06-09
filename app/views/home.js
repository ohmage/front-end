export default Ember.View.extend({
  didInsertElement: function() {
    var self = this;
    Ember.run.scheduleOnce('afterRender', this, function() {
      $('#side-menu').metisMenu();
          Ember.run.scheduleOnce('afterRender', this, function() {

        self.$('.active .collapse').collapse('show');
      });
    });
  }
});