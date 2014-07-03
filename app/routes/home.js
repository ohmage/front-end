import Ember from "ember";
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function() {
    if(this.get('session').get('isAuthenticated')) {
      return this.store.find('person', this.get('session').content.user_id);
    }
  },

  beforeModel: function(transition) {
    // Only abort the transition if we are going to '/'
    if(transition.intent.url === "/") {
      this._super(transition);
    }
  },

  renderTemplate: function() {
    if(this.get('session').get('isAuthenticated')) {
      this.render('sidebar', { outlet: 'sidebar'});
    }
    this.render();
  },

  actions: {
    showError: function(error) {
      this.controller.set('error', error);
    },

    edit: function(model) {
      this.transitionTo(model.constructor.typeKey + ".edit", model);
    },

    clone: function(model) {
      this.transitionTo(model.constructor.typeKey + ".clone", model);
    },

    willTransition: function() {
      this.controller.set('error', null);
      return true;
    },
  }
});