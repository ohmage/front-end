/*global gapi:false */
import Ember from "ember";
import Authenticator from 'simple-auth-oauth2/authenticators/oauth2';
import Authorizor from 'simple-auth-oauth2/authorizers/oauth2';

var OhmageAuthorizer = Authorizor.extend({
/**
  Authorizes an XHR request by sending the `access_token` property from the
  session as a bearer token in the `Authorization` header:

  ```
  Authorization: Bearer <access_token>
  ```

  @method authorize
  @param {jqXHR} jqXHR The XHR request to authorize (see http://api.jquery.com/jQuery.ajax/#jqXHR)
  @param {Object} requestOptions The options as provided to the `$.ajax` method (see http://api.jquery.com/jQuery.ajaxPrefilter/)
  */
  authorize: function(jqXHR, requestOptions) {
    // Don't authorize the auth token path
    if(requestOptions.url !== '/ohmage/auth_token') {
      // This call to super really only gives a warning if the credentials aren't transmitted over https
      this._super(jqXHR, requestOptions);
      var accessToken = this.get('session.access_token');
      if (this.get('session.isAuthenticated') && !Ember.isEmpty(accessToken)) {
        jqXHR.setRequestHeader('Authorization', 'ohmage ' + accessToken);
      }
    }
  }
});

var OhmageAuthenticator = Authenticator.extend({
  serverTokenEndpoint: '/ohmage/auth_token',

  authenticate: function(options) {
    if(options.identification && options.password) {
      return this.authenticateWithPayload({ email: options.identification, password: options.password });
    } else {
      return this.authenticateWithPayload(options);
    }
  },

  authenticateWithProvider: function(provider, token) {
    return this.authenticateWithPayload({ provider: provider, access_token: token });
  },

  /**
    Changes to use the expiresAt function, and to use email instead of username
  */
  authenticateWithPayload: function(data) {
    var _this = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      _this.makeRequest(data).then(function(response) {
        Ember.run(function() {
          var expiresAt = _this.absolutizeExpirationTime(response.expires_in);
          _this.scheduleAccessTokenRefresh(response.expires_in, expiresAt, response.refresh_token);
          resolve(Ember.$.extend(response, { expires_at: expiresAt }));
        });
      }, function(xhr) {
        Ember.run(function() {
          var msg;
          if(xhr) {
            msg = xhr.responseText || xhr.responseJSON;
          }
          msg = msg || "Unknown Error";
          reject({xhr: xhr, data: data, msg: msg});
        });
      });
    });
  },

  makeRequest: function(data) {
    var response = this._super(data).then(function(response) {
      response.expires_in = (response.expires - new Date().getTime())/1000;
      response.expires_at = response.expires;
      delete response.expires;
      return response;
    });
    return response;
  },
});

var GooglePlusAuthenticator = OhmageAuthenticator.extend({

  authenticate: function() {
    var self = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      gapi.auth.signIn({
        // If approvalPrompt is not set the account picker is shown even when a user is logged in..
        // TODO: figure out why the picker is shown
        'approvalprompt' : 'force',
        callback: function(authResult) {
          if (authResult && !authResult.error) {
            resolve(self.authenticateWithProvider('google', authResult.access_token));
          } else {
            if(!authResult || authResult.error !== 'immediate_failed') {
              reject((authResult || {}).error);
            }
          }
        }
      });
    });
  },

  invalidate: function() {
    return new Ember.RSVP.resolve(gapi.auth.signOut());
  }
});

export default {
  name: 'authentication',
  before: 'simple-auth',
  initialize: function(container) {
    container.register('authorizer:ohmage', OhmageAuthorizer);
    container.register('authenticator:ohmage', OhmageAuthenticator);
    container.register('authenticator:googleplus', GooglePlusAuthenticator);

    window.ENV = window.ENV || {};
    window.ENV['simple-auth'] = {
      authorizer: 'authorizer:ohmage',
      routeAfterAuthentication: 'home'
    };
  }
};