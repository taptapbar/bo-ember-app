Ember.Handlebars.registerBoundHelper('setSelectedDimensions', function(dimensions) {
  $('.dimension .attribute').removeClass('selected');
  $.each(dimensions, function(index, dimension){
    $('.dimension .attribute[data-value="'+dimension+'"]').addClass('selected');
  });
});

Ember.Handlebars.registerBoundHelper('setSelectedMeasure', function(measure) {
  $('.measures .attribute').removeClass('selected');
  $('.measures .attribute[data-value="'+measure+'"]').addClass('selected');
});


App.Func = {
  fetchDimensionAndMeasureData: function(callback) {
    var requestURI = [appConfig.store.adapter.URL, 
                      '/', appConfig.store.adapter.namespace, '/', appConfig.multiview.dimensionsAndMeasuresURL, '.json'].join('');
    $.getJSON(requestURI, function(data) {
      formData = data;
      Ember.set('App.formData', formData);
      
      if (callback !== undefined) {
        callback();
      }
    })
  }
}