Ember.Handlebars.registerBoundHelper('setSelectedDimensions', function(dimensions) {
  $('.dimension .attribute').removeClass('selected');
  $.each(dimensions, function(index, dimension){
      var stringArray = dimension.split('.');
      var dim = stringArray[0];
      var sub = stringArray[1];
      $('.dimension h4[data-value="'+dim+'"]').siblings().children('[data-value="'+sub+'"]').addClass('selected');
      //$('.dimension .attribute[data-value="'+sub+'"]').addClass('selected');
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