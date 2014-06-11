export default Ember.Controller.extend(Ember.SimpleAuth.LoginControllerMixin, {
  authenticatorFactory: 'authenticator:ohmage',

  actions: {
    authenticate: function() {
      this.set('identificationError', false);
      this.set('passwordError', false);

      if(!this.get('identification')) {
        this.set('identificationError', true);
        return;
      }

      if(!this.get('password')) {
        this.set('passwordError', true);
        return;
      }

      this._super();
    },
  }
});