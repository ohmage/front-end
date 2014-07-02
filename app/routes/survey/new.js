import Ember from "ember";
import ReloadModel from 'ohmage/mixins/reload-model';
import Editable from 'ohmage/mixins/editable';
import NewModel from 'ohmage/mixins/new-model';

export default Ember.Route.extend(ReloadModel, Editable, NewModel, {
  model: function() {
    return this.store.createRecord('survey');
  },

  /**
    Use the edit template for rendering
  */
  renderTemplate: function(controller) {
    this.render('survey.edit', {
      controller: controller
    });
  },

  addModelToUserList: function(user, model) {
    user.get('surveys').pushObject(model);
    user.notifyPropertyChange('surveys');
  },
});