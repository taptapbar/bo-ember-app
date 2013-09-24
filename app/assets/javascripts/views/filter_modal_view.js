App.FilterModalView = Ember.View.extend({
  //layoutName : 'layouts/modal',
  templateName : 'filter',
  showHeader: true,
  model: null,
  filterList: null,
  filterValues: null,
  filterMethod: null,

  close: function() {
    this.destroy();
  },

  didInsertElement: function() {
    // initialize autocomplete select after all elements are loaded
    $(".autocomplete-select").on('chosen:showing_dropdown', function(evt, params) {
      console.log(evt, params);
    }).on('chosen:hiding_dropdown', function(evt, params) {
      console.log(evt, params);
    }).chosen({
      width: "500px",
      no_results_text: "Oops, nothing found!",
    });

    // bind filterMethod value to the radio buttons
    resetFilterModal(this.filterMethod);

    //initialize popup-body max-height & popup-window height
    $(".popup-window-body").css('max-height', ($(".popup-window-bg").height()*0.8 - $(".popup-window-header").height() - $(".popup-window-footer").height() - 56));
    $('.popup-window-bg').height($('body').height());
  }
});

function resetFilterModal(filterMethod) {
  filterMethod = (filterMethod == "exclude") ? "exclude" : "view";
  $('input[name="filter-method"][value="'+filterMethod+'"]').click();
  console.log("filter-method: ", $('input[name="filter-method"][value="'+filterMethod+'"]'));
};

$(document).on('click', "#filter-window div[class*='toggler']", function() {
	//console.log('checkbox clicked');
  console.log("toggler clicked");
	var self = this;
	$.each($(this).siblings(".toggleable-panel"), function (index, item) {
		//console.log($(item).data('panel'));
		if($(item).data('panel') == $(self).data('value')) {
      
      // activate autocomplete-select in filter modal
      // $(".autocomplete-select").on('chosen:showing_dropdown', function(evt, params) {
      //   console.log(evt, params);
      // }).on('chosen:hiding_dropdown', function(evt, params) {
      //   console.log(evt, params);
      // }).chosen({
      //   width: "500px",
      //   no_results_text: "Oops, nothing found!",
      // });
  
      $(item).toggle('blind', 200);
      var toggleIcon = $(self).children('div').first()
      toggleIcon.toggleClass('i-arrow-right').toggleClass('i-arrow-down');
		}
	})
});

$(document).on('click', "#filter-window div[class*='select-all']", function() {
  $($(this).parent()).siblings('ul').children('li').children('label').children('input').prop('checked', true);
});
$(document).on('click', "#filter-window div[class*='select-none']", function() {
  $($(this).parent()).siblings('ul').children('li').children('label').children('input').prop('checked', false);
});