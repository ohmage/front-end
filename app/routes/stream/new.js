import Ember from "ember";
import ReloadModel from 'ohmage/mixins/reload-model';
import Editable from 'ohmage/mixins/editable';
import NewModel from 'ohmage/mixins/new-model';

export default Ember.Route.extend(ReloadModel, Editable, NewModel, {
  model: function() {
    return this.store.createRecord('stream');
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