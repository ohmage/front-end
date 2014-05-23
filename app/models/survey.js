import SchemaModel from 'ohmage/models/schema';

export default SchemaModel.extend({
  survey_items: DS.attr('raw'),
  isLoaded: function() {
    return this.get('survey_items');
  }
});