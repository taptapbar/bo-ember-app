App.TimeframeModalView = Ember.View.extend({
  //layoutName : 'layouts/modal',
  templateName : 'timeframe',
  showHeader: true,
  model: null,
  timescope: null,

  close: function() {
    this.destroy();
  },

  didInsertElement: function() {
  	console.log("didInsertElement: ", 'TimeframeView');
    activateDatePicker();
    bindTimescopeDataToCurrentView(this.timescope);

    //initialize popup-body max-height & popup-window height
    $(".popup-window-body").css('max-height', ($(".popup-window-bg").height()*0.8 - $(".popup-window-header").height() - $(".popup-window-footer").height() - 56));
    $('.popup-window-bg').height($('body').height());
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
	// switch selected panel
  self = $(this);
	targetPanel = $('#'+self.data('panel'));
	targetPanel.siblings().each(function () {
		$(this).css('display', 'none');
	});
	targetPanel.css('display', 'block');
});

// initialization for radio-pills
$(document).on('click', "input[type='radio']", function() {
  // style selected div
  selectedDiv = $(this).closest('div[class*="radio-pill"]');
  var selectedRadioName = $(this).attr('name');
  $('input[type="radio"][name="'+selectedRadioName+'"]').closest('div[class*="radio-pill"]').removeClass('radio-pill-selected');
  $(selectedDiv).addClass('radio-pill-selected');
});
$(document).on('click', "input[type='number'], input[type='text'], div[class*='radio-pill'] span", function() {
  $(this).closest('div[class*="radio-pill"]').find('input[type="radio"]').first().click();
});
$(document).on('change', "div[class*='radio-pill'] select", function() {
  $(this).closest('div[class*="radio-pill"]').find('input[type="radio"]').first().click();
});

function bindTimescopeDataToCurrentView(timescope) {
  // bind Range data
  if(!Ember.isEmpty(timescope.range)) {
    var period = timescope.range.period;
    if(period !== "all") {
      var datefrom  = period.split(':')[0].split('/');
      var dateto    = period.split(':')[1].split('/');
      $('input[name="timeframeRangeRadio"][value="range"]').click();
      $('#timeframe-range-from').datepicker('setDate', new Date(datefrom[2], datefrom[0], datefrom[1]));
      $('#timeframe-range-to').datepicker('setDate', new Date(dateto[2], dateto[0], dateto[1]));
    } else {
      $('input[name="timeframeRangeRadio"][value="all"]').click();
    }
  }

  //bind Cycle data
  if(!Ember.isEmpty(timescope.cycle)) {
    //var cycle     = timescope.range.cycle;
    var repeat    = timescope.cycle.repeat;
    var calendar  = timescope.cycle.calendar;
    if(!Ember.isNone(repeat)) {
      if(repeat.type == 'year') {
        //for block "year"
        $('#timeframe-container input[type="radio"][name="cycle"][value="year"]').click();
        if(Ember.isNone(calendar.weekdays)) {
          // 1st radio in block "year"
          $('#timeframe-container input[type="radio"][name="cycle-year"][value="1"]').click();
          $('#timeframe-cycle-year-select-1').val(calendar.months.selected_months[0]);
          $('#timeframe-cycle-year-select-2').val(calendar.months.number);
          $('#timeframe-cycle-year-repeat-number-1').val(repeat.number);
        } else {
          // 2nd radio in block "year"
          $('#timeframe-container input[type="radio"][name="cycle-year"][value="2"]').click();
          $('#timeframe-cycle-year-select-3').val(calendar.weekdays.number);
          $('#timeframe-cycle-year-select-4').val(calendar.weekdays.selected_days[0]);
          $('#timeframe-cycle-year-select-5').val(calendar.months.selected_months[0]);
          $('#timeframe-cycle-year-repeat-number-2').val(repeat.number);
        }
        
      } else if(repeat.type == 'month') {
        //for block "month"
        $('#timeframe-container input[type="radio"][name="cycle"][value="month"]').click();
        if(!Ember.isNone(calendar.days)) {
          // 1st radio in block "month"
          $('#timeframe-container input[type="radio"][name="cycle-month"][value="1"]').click();
          $('#timeframe-cycle-month-select-1').val(calendar.days.number);
          $('#timeframe-cycle-month-repeat-number-1').val(repeat.number);
        } else {
          // 2nd radio in block "month"
          $('#timeframe-container input[type="radio"][name="cycle-month"][value="2"]').click();
          $('#timeframe-cycle-month-select-2').val(calendar.weekdays.number);
          $('#timeframe-cycle-month-select-3').val(calendar.weekdays.selected_days[0]);
          $('#timeframe-cycle-month-repeat-number-2').val(repeat.number);
        }
  
      } else if(repeat.type == 'week') {
        //for block "week"
        $('#timeframe-container input[type="radio"][name="cycle"][value="week"]').click();
        if(!Ember.isNone(calendar.weekdays)) {
          // 1st radio in block "week"
          $('input[name="timeframe-cycle-week-weekdays-checkbox"]').each(function() {
            if($.inArray($(this).val(), calendar.weekdays.selected_days) !== -1) {
              $(this).attr('checked', true);
            }
          });
          $('#timeframe-cycle-week-repeat-number').val(repeat.number);
        }
      } else {
        // set the rest to default: all 
        $('#timeframe-container input[type="radio"][name="cycle"][value="all"]').click();
      }
    }
  }
}