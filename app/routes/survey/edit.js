import ReloadModel from 'ohmage/mixins/reload-model';
import Editable from 'ohmage/mixins/editable';
import Schema from 'ohmage/mixins/schema';

export default Ember.Route.extend(ReloadModel, Editable, Schema, {
  model: function(params) {
    return this.store.find('survey', this.buildId(params));
  },
  actions: {
    cancel: function(model) {
      this.transitionTo('survey', model);
    }
  },
});