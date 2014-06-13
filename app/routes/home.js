export default Ember.Route.extend(Ember.SimpleAuth.AuthenticatedRouteMixin, {
  model: function() {
    return this.store.find('person', this.get('session').content.user_id);
  },

  renderTemplate: function() {
    this.render('sidebar', { outlet: 'sidebar'});
    this.render();
  },

  actions: {
    showError: function(error) {
      this.controller.set('error', error);
    },

    edit: function(model) {
      this.transitionTo(model.constructor.typeKey + ".edit", model);
    },

    clone: function(model) {
      this.transitionTo(model.constructor.typeKey + ".clone", model);
    },

    willTransition: function() {
      this.controller.set('error', null);
      return true;
    },
  }
});