App.FilterModalView = Ember.View.extend({
  //layoutName : 'layouts/modal',
  templateName : 'filter',
  showHeader: true,
  model: null,

  close: function() {
    this.destroy();
  }
});