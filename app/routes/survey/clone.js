import New from 'ohmage/routes/survey/new';

export default New.extend({
  model: function(params) {
    return this.store.find('survey', params.survey_id);
  },
  setModel: function(model) {
    this._super(model.clone());
  }
});