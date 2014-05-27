export default Ember.Route.extend({
  actions: {
    update: function(model) {
      var self = this;

      try {
        jsonlint.parse(model.get('definition'));
      } catch(e) {
        this.send('showError', e);
        return;
      }

      try {
        jsonlint.parse(model.get('apps'));
      } catch(e) {
        this.send('showError', e);
        return;
      }

      model.save().then(function(saved) {
        // Update the user's surveys
        var user = self.store.getById('person', self.get('session').content.user_id);
        user.reload().then(function() {
          self.transitionTo('stream', saved);
        });

      }).then(null, function(response) {
        self.send('showError', response.responseText || response.message);
      });
    }
  }
});