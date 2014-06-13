var filterByName = function(item) {
    var query = this.get('query');
    if(query) {
      return item.get('name').indexOf(query) > -1;
    }
    return true;
  };

export default Ember.ObjectController.extend({

  ohmlets: Ember.computed.filter('model.sortedOhmlets', filterByName)
    .property('model.sortedOhmlets', 'query'),

  streams: Ember.computed.filter('model.sortedStreams', filterByName)
    .property('model.sortedStreams', 'query'),

  surveys: Ember.computed.filter('model.sortedSurveys', filterByName)
    .property('model.sortedSurveys', 'query'),
});