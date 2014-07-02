import DS from "ember-data";

import SchemaModel from 'ohmage/models/schema';

export default SchemaModel.extend({
  definition: DS.attr('raw'),
  apps: DS.attr('raw'),
  isLoaded: function() {
    return this.get('definition') && this.get('apps');
  }
});