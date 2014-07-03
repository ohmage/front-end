import Ember from "ember";
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Mixin.create(AuthenticatedRouteMixin, {
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