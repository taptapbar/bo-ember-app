App.FilterModalView = Ember.View.extend({
  //layoutName : 'layouts/modal',
  templateName : 'filter',
  showHeader: true,

  close: function() {
    this.destroy();
  }
});