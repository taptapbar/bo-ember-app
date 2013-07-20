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
  },
  
  setSelectedMeasure: function(measure) {
    $('.measures .attribute').removeClass('selected');
    $('.measures .attribute[data-value="'+measure+'"]').addClass('selected');
  }
});