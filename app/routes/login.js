import NoAccount from 'ohmage/mixins/no-account';

export default Ember.Route.extend(NoAccount, {
  actions: {
    sessionAuthenticationFailed: function(error) {
      if(error.xhr && error.xhr.status === 409) {
        // No account exists yet
        var registerController = this.controllerFor('register');
        registerController.set('provider_token', error.data.access_token);
        this.transitionTo('register');
      } else {
        this.controller.set('error', error.msg);
      }
    },

    authenticateWithGooglePlus: function() {
      this.get('session').authenticate('authenticator:googleplus', {});
    },

    willTransition: function() {
      this.controller.clear();
      return true;
    },
  },
});