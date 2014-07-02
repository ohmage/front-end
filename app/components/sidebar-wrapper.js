import Ember from "ember";

export default Ember.Component.extend({
  classNames: ['sidebar-collapse'],

  classNameBindings: ['collapse'],

  collapse: function() {
    return ((window.innerWidth > 0) ? window.innerWidth : screen.width) < 768;
  }.property('width'),

  _resizeHandler: null,

  didInsertElement: function() {
    this._super();
    // we save the binded resize function to keep the identity, so unbind will remove
    var self = this;
    this._resizeHandler = function() {
      var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
      self.set('width', width);
    };

    Ember.$(window).bind('load resize', this._resizeHandler);
  },

  willClearRender: function() {
    this._super();
    Ember.$(window).unbind('load resize', this._resizeHandler);
  }
});
