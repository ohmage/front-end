import Ember from "ember";
import ReloadModel from 'ohmage/mixins/reload-model';
import Editable from 'ohmage/mixins/editable';
import Schema from 'ohmage/mixins/schema';

export default Ember.Route.extend(ReloadModel, Editable, Schema, {
  model: function(params) {
    return this.store.find('stream', this.buildId(params));
  },
  actions: {
    cancel: function(model) {
      this.send('showError', null);
      this.transitionTo('stream', model);
    }
  },
});