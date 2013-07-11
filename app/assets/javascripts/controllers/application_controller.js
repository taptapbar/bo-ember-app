App.ApplicationController = Ember.Controller.extend({
  init: function () {
    console.log('init');
    this._super();
    
    this.fetchDimensionAndMeasureData();
  },
  
  fetchDimensionAndMeasureData: function() {
    var requestURI = [appConfig.store.adapter.URL, 
                      '/', appConfig.multiview.dimensionsAndMeasuresURL, '.json'].join('');
    $.getJSON(requestURI, function(data) {
      formData = data;
      Ember.set('App.formData', formData);
    })
  }
});
