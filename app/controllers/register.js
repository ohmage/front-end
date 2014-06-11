export default Ember.Controller.extend({
  actions: {
    register: function() {
      var self = this, data = this.getProperties('email', 'full_name');
      return new Ember.RSVP.Promise(function(resolve) {
      $.ajax({
        type: "post",
        url: "/ohmage/people?password=" + self.get('password'),
        contentType: "application/json", 
        data: JSON.stringify(data), 
        success: function() {
          self.set('error', null);
          self.set('success', "Please check your e-mail and click the verification link to continue.");
          resolve();
        },
        error: function(error) {
          self.set('error', error.responseText || "Unknown Error");
          resolve();
        }
      });
    });
    },
  }
});