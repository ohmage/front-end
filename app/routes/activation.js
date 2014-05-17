export default Ember.Route.extend({
  model: function(params) {
    return $.ajax({
        type: "get", url: "/ohmage/activation?activation_id=" + params.activation_id
    }).then(null, function() {
      return Ember.RSVP.resolve({error: 'Invalid activation code'});
    });
  },
  afterModel: function(res, transition) {
    if(!res.error) {
      this.transitionTo('/home');
    } else {
      transition.send('showError', res.error);
    }
  }
});