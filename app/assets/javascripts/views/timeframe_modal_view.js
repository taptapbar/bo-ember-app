App.TimeframeModalView = Ember.View.extend({
  //layoutName : 'layouts/modal',
  templateName : 'timeframe',
  showHeader: true,

  close: function() {
    this.destroy();
  },

  didInsertElement: function() {
  	console.log("didInsertElement: ", 'TimeframeView');
    activateDatePicker();
  }
});

function activateDatePicker(selector) {
	$( "#timeframe-range-from" ).datepicker({
      //defaultDate: "+1w",
      changeMonth: true,
      changeYear: true,
      numberOfMonths: 3,
      onClose: function( selectedDate ) {
        $( "#timeframe-range-to" ).datepicker( "option", "minDate", selectedDate );
      }
    });
    $( "#timeframe-range-to" ).datepicker({
      //defaultDate: "+1w",
      changeMonth: true,
      changeYear: true,
      numberOfMonths: 3,
      onClose: function( selectedDate ) {
        $( "#timeframe-range-from" ).datepicker( "option", "maxDate", selectedDate );
      }
    });
};

$(document).on('click', "input[type='radio'][name='cycle']", function() {
	self = $(this);
	targetPanel = $('#'+self.data('panel'));
	targetPanel.siblings().each(function () {
		$(this).css('display', 'none');
	});
	targetPanel.css('display', 'block');
});