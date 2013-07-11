App.TimeframeModalView = Ember.View.extend({
  //layoutName : 'layouts/modal',
  templateName : 'timeframe',
  showHeader: true,

  close: function() {
    this.destroy();
  }
});