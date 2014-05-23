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
        self.transitionTo('stream', saved);
      }).then(null, function(response) {
        self.send('showError', response.responseText);
      });
    }
  }
});