import New from 'ohmage/routes/schema/new';

export default New.extend({
  setModel: function(model) {
    this._super(model.clone());
  }
});