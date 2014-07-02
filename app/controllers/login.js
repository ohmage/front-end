import Ember from "ember";

export default Ember.Controller.extend(Ember.SimpleAuth.LoginControllerMixin, {
  authenticatorFactory: 'authenticator:ohmage',

  ohmageAccount: Ember.computed.not('provider_token'),

  identification: Ember.computed.alias('email'),

  clear: function() {
      this.set('error', null);
      this.set('success', null);
      this.set('emailError', false);
      this.set('passwordError', false);
  },

  actions: {
    register: function() {

      this.clear();

      var self = this, data, parameters, success;

      if(this.get('provider_token')) {
        data = this.getProperties('full_name');
        parameters = "provider=google&access_token=" + self.get('provider_token');
        success = function(resolve) {
          self.get('session').authenticate('authenticator:ohmage', {provider: "google", access_token: self.get('provider_token')})
          .then(resolve);
        };
      } else {
        if(!this.get('email')) {
          this.set('emailError', true);
          return;
        }

        if(!this.get('password')) {
          this.set('passwordError', true);
          return;
        }

        data = this.getProperties('email', 'full_name');
        parameters = "password=" + self.get('password');
        success = function(resolve) {
          self.set('success', "Please check your e-mail and click the verification link to continue.");
          resolve();
        };
      }

      return new Ember.RSVP.Promise(function(resolve) {
        Ember.$.ajax({
          type: "post",
          url: "/ohmage/people?" + parameters,
          contentType: "application/json",
          data: JSON.stringify(data),
          success: function() { success(resolve); },
          error: function(error) {
            self.set('error', error.responseText || "Unknown Error");
            resolve();
          }
        });
      });
    },

    authenticate: function() {
      this.clear();

      if(!this.get('email')) {
        this.set('emailError', true);
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