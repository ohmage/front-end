export default Ember.Controller.extend({
  actions: {
    register: function() {
      var self = this, data = this.getProperties('email', 'full_name');
      return new Ember.RSVP.Promise(function(resolve, reject) {
      $.ajax({
        type: "post",
        url: "/ohmage/people?password=" + self.get('password'),
        contentType: "application/json", 
        data: JSON.stringify(data), 
        success: function(response) {
          self.send('showSuccess', "Please check your e-mail to click the verification link to continue.");
          resolve();
        },
        error: function(error) {
          self.send('showError', error.responseText);
          resolve();
        }
      });
    });
    },
  }
});