import NoAccount from 'ohmage/mixins/no-account';

export default Ember.Route.extend(NoAccount, {
  controllerName: 'login',

  renderTemplate: function() {
    this.render({ controller: 'login' });
  },

  actions: {
    sessionAuthenticationFailed: function(error) {
      this.controller.set('error', error.msg);
    },

    willTransition: function() {
      this.controller.clear();
      this.controller.set('provider_token', null);
      return true;
    },
  }
});