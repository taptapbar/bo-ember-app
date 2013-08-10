Ember.Handlebars.registerBoundHelper('setSelectedDimensions', function(dimensions) {
  $('.dimension .attribute').removeClass('selected');
  $.each(dimensions, function(index, dimension){
    $('.dimension .attribute[data-value="'+dimension+'"]').addClass('selected');
  });
  $('.dimension .attribute').each(function () {
    var originString = $(this).text();
    $(this).text(originString.trim(18));
  });
});

Ember.Handlebars.registerBoundHelper('setSelectedMeasure', function(measure) {
  $('.measures .attribute').removeClass('selected');
  $('.measures .attribute[data-value="'+measure+'"]').addClass('selected');
  $('.measures .attribute').each(function () {
    var originString = $(this).text();
    $(this).text(originString.trim(20));
  });
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