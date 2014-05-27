export default {
  name: 'model-rollback',
  initialize: function(container, application) {
    DS.Model.reopen({
      // When the record is fetched, save its relations so they can be reverted
      _saveRelations: function() {
        var savedRelations = this._savedRelations = {};
        this.constructor.eachRelationship(function(key, relationship) {
          if (relationship.kind === 'hasMany') {
            savedRelations[key] = this.get(key).toArray();
          }
        }, this);
      }.on('didLoad', 'didCreate', 'didUpdate'),

      // Rollback relations as well as attributes
      rollback: function() {
        // Revert attributes like normal
        this._super();

        // Revert relationships to their state at last fetch
        if (this._savedRelations) {
          Ember.keys(this._savedRelations).forEach(function(key) {
            this.suspendRelationshipObservers(function() {
              this.get(key).setObjects(this._savedRelations[key]);
            }, this);

            // Rollback child records that have changed as well (optional)
            this.get(key).filterBy('isDirty').invoke('rollback');
          }, this);
        }
      },

      /**
        Force save relations on a reload
      */
      reload: function() {
        return this._super().then(function(result) {
          result._saveRelations();
          return result;
        });
      },
    });
  }
}