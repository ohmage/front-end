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
    }
  }
});