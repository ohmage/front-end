export default Ember.Route.extend({
  model: function(params) {
    return $.ajax({
        type: "get",
        url: "/ohmage/activation?activation_id=" + params.activation_id
    });
  },

  afterModel: function() {
    this.transitionTo('home');
  }
});