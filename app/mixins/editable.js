import Ember from "ember";

export default Ember.Mixin.create(Ember.SimpleAuth.AuthenticatedRouteMixin, {
  actions: {
    willTransition: function(transition) {
      var controller = this.controller;
      if (controller.get('isDirty')) {
        if(!confirm("Are you sure you want to cancel?")) {
          transition.abort();
          return false;
        } else {
          this.send('cleanup');
        }
      }
      return true;
    },
    cleanup: function() {
      this.controller.get('model').rollback();
    }
  },
});