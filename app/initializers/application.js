var OhmageAuthorizer = Ember.SimpleAuth.Authorizers.OAuth2.extend({
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
      var accessToken = this.get('session.access_token');
      if (this.get('session.isAuthenticated') && !Ember.isEmpty(accessToken)) {
      if (!Ember.SimpleAuth.Utils.isSecureUrl(requestOptions.url)) {
        Ember.Logger.warn('Credentials are transmitted via an insecure connection - use HTTPS to keep them secure.');
      }
      jqXHR.setRequestHeader('Authorization', 'ohmage ' + accessToken);
    }
  }
});

var OhmageAuthenticator = Ember.SimpleAuth.Authenticators.OAuth2.extend({
  serverTokenEndpoint: '/ohmage/auth_token',

  expiresAt: function(response) {
   return response.expires/1000;
  },

      /**
        Changes to use the expiresAt function, and to use email instead of username
      */
      authenticate: function(credentials) {
        var _this = this;
        return new Ember.RSVP.Promise(function(resolve, reject) {
          var data = { grant_type: 'password', email: credentials.identification, password: credentials.password };
          _this.makeRequest(data).then(function(response) {
            Ember.run(function() {
              var expiresAt = _this.expiresAt(response) || _this.absolutizeExpirationTime(response.expires_in);
              _this.scheduleAccessTokenRefresh(response.expires_in, expiresAt, response.refresh_token);
              resolve(Ember.$.extend(response, { expires_at: expiresAt }));
            });
          }, function(xhr) {
            Ember.run(function() {
              reject(xhr.responseJSON || xhr.responseText);
            });
          });
        });
      },

  refreshAccessToken: function(expiresIn, refreshToken) {
    var _this = this;
    var data  = { grant_type: 'refresh_token', refresh_token: refreshToken };
    return new Ember.RSVP.Promise(function(resolve, reject) {
      _this.makeRequest(data).then(function(response) {
        Ember.run(function() {
          expiresIn     = response.expires_in || expiresIn;
          refreshToken  = response.refresh_token || refreshToken;
          var expiresAt = _this.expiresAt(response) || _this.absolutizeExpirationTime(expiresIn);
          var data      = Ember.$.extend(response, { expires_in: expiresIn, expires_at: expiresAt, refresh_token: refreshToken });
          _this.scheduleAccessTokenRefresh(expiresIn, null, refreshToken);
          _this.trigger('updated', data);
          resolve(data);
        });
      }, function(xhr, status, error) {
        Ember.Logger.warn('Access token could not be refreshed - server responded with ' + error + '.');
        reject();
      });
    });
  },

  makeRequest: function(data) {
    var response = this._super(data);
    response.expires_at = response.expires;
    delete response.expires;
    return response;
  },
});

export default {
  name: 'authentication',
  initialize: function(container, application) {
    container.register('authorizer:ohmage', OhmageAuthorizer);
    container.register('authenticator:ohmage', OhmageAuthenticator);
    Ember.SimpleAuth.setup(container, application, {
      authorizerFactory: 'authorizer:ohmage'
    });
  }
};