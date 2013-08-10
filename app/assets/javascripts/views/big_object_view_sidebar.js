App.BigObjectViewSidebarView = Ember.View.extend({
  templateName: 'big_object_view_sidebar',
  
  didInsertElement: function() {
    var object = this.get('controller').get('model');
    this.setSelectedDimensions(object.get('dimensions'));
    this.setSelectedMeasure(object.get('measure'));
  },
  
  setSelectedDimensions: function(dimensions) {
    $('.dimension .attribute').removeClass('selected');
    $.each(dimensions, function(index, dimension){
      $('.dimension .attribute[data-value="'+dimension+'"]').addClass('selected');
    });
    $('.dimension .attribute').each(function () {
      var originString = $(this).text();
      $(this).text(originString.trim(18));
    });
  },
  
  setSelectedMeasure: function(measure) {
    $('.measures .attribute').removeClass('selected');
    $('.measures .attribute[data-value="'+measure+'"]').addClass('selected');
    $('.measures .attribute').each(function () {
      var originString = $(this).text();
      $(this).text(originString.trim(20));
    });
  }
});