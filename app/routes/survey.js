export default Ember.Route.extend({
  actions: {
    update: function(model) {
      var self = this;

      if(!model.get('name')) {
        this.send('showError', "The Name is required");
        return;
      }

      if(!model.get('description')) {
        this.send('showError', "The Description is required");
        return;
      }

      if(!model.get('survey_items')) {
        this.send('showError', "The Survey Items Definition is required");
        return;
      }

      try {
        window.jsonlint.parse(model.get('survey_items'));
      } catch(e) {
        this.send('showError', e);
        return;
      }

      model.save().then(function(saved) {
        // Update the user's surveys
        var user = self.store.getById('person', self.get('session').content.user_id);
        user.reload().then(function() {
          self.send('showError', null);
          self.transitionTo('survey', saved);
        });

      }).then(null, function(response) {
        self.send('showError', response.responseText || response.message);
      });
    }
  }
});