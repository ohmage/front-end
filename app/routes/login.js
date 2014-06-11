import NoAccount from 'ohmage/mixins/no-account';

export default Ember.Route.extend(NoAccount, {
  actions: {
    sessionAuthenticationFailed: function(error) {
      this.controller.set('error', error || "Unknown Error");
    },
  },
});