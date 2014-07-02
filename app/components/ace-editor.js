import Ember from "ember";

export default Ember.Component.extend({
  classNames: ['editor'],

  content: function(key, val) {
    if (!this.editor) {
      this.preset = val;
      return val;
    }
    if (arguments.length === 1) {
      return this.editor.getSession().getValue();
    }
    var cursor = this.editor.getCursorPosition();
    this.editor.getSession().setValue(val);
    this.editor.moveCursorToPosition(cursor);
    return val;
  }.property(),
  
  didInsertElement: function() {
    this.editor = window.ace.edit(this.elementId);
    this.editor.getSession().setMode('ace/mode/json');

    var self = this;
    this.editor.on('change', function() {
      self.notifyPropertyChange('content');
    });

    if (this.preset) {
      this.set('content', this.preset);
      this.preset = null;
    }

    this.resizeView();
  },

  resizeView: function() {
    var renderer = this.editor.renderer;
    var newHeight = this.editor.getSession().getScreenLength() * renderer.lineHeight + renderer.scrollBar.getWidth();
    newHeight = Math.max(newHeight, 200);
    Ember.$("#" + this.elementId).height(newHeight.toString());
    this.editor.resize();
  }.observes('content')
});
