export default DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  survey_items: DS.attr('raw')
});