App.TimeframeView = Ember.View.extend({
  templateName: 'timeframe',
  
  didInsertElement: function() {
    activateDatePicker();
  }
});
function activateDatePicker() {
	$('.li-datepicker input').datepicker();
}