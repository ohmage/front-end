import Ember from "ember";
import ReloadModel from 'ohmage/mixins/reload-model';
import Editable from 'ohmage/mixins/editable';
import NewModel from 'ohmage/mixins/new-model';
import CloneModel from 'ohmage/mixins/clone-model';
import Schema from 'ohmage/mixins/schema';

export default Ember.Route.extend(ReloadModel, Editable, NewModel, CloneModel, Schema, {
  model: function(params) {
    return this.store.find('stream', this.buildId(params));
  },

  /**
    Use the edit template for rendering
  */
  renderTemplate: function(controller) {
    this.render('stream.edit', {
      controller: controller
    });
  },

  addModelToUserList: function(user, model) {
    user.get('streams').pushObject(model);
    user.notifyPropertyChange('streams');
  },
});