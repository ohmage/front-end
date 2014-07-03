import Ember from "ember";
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  actions: {
    sessionAuthenticationFailed: function() {
      this.transitionTo('login');
      this.controllerFor('login').set('error', "Authentication Failed. You have been logged out.");
    },
  }
});