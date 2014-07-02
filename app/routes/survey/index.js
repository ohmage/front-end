import Ember from "ember";
import ReloadModel from 'ohmage/mixins/reload-model';
import Schema from 'ohmage/mixins/schema';

export default Ember.Route.extend(ReloadModel, Schema, {
  model: function(params) {
    return this.store.find('survey', this.buildId(params));
  },
});