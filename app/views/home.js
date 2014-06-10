export default Ember.View.extend({
  didInsertElement: function() {
    Ember.run.scheduleOnce('afterRender', this, function() {
      $('#side-menu').metisMenu();

      // Open any menus which have active links
      $('li ul').has('a.active').addClass('collapse in');
      $('li ul').not(':has(a.active)').addClass('collapse');
    });
  }
});