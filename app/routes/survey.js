export default Ember.Route.extend({
  actions: {
    update: function(model) {
      var self = this;

      try {
        jsonlint.parse(model.get('survey_items'));
      } catch(e) {
        this.send('showError', e);
        return;
      }

      model.save().then(function(saved) {
        self.transitionTo('survey', saved);
      }).then(null, function(response) {
        self.send('showError', response.responseText);
      });
    }
  }
});