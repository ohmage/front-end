import Ember from "ember";

export default Ember.View.extend({
  didInsertElement: function() {
    Ember.run.scheduleOnce('afterRender', this, function() {
      Ember.$('#side-menu').metisMenu();

      // Open any menus which have active links
      Ember.$('li ul').has('a.active').addClass('collapse in');
      Ember.$('li ul').not(':has(a.active)').addClass('collapse');
    });
  }
});