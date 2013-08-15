App.FilterModalView = Ember.View.extend({
  //layoutName : 'layouts/modal',
  templateName : 'filter',
  showHeader: true,
  model: null,
  filterList: null,
  filterValues: null,

  close: function() {
    this.destroy();
  },

  didInsertElement: function() {
    $(".autocomplete-select").on('chosen:showing_dropdown', function(evt, params) {
      console.log(evt, params);
    }).on('chosen:hiding_dropdown', function(evt, params) {
      console.log(evt, params);
    }).chosen({
      width: "500px",
      no_results_text: "Oops, nothing found!",
    });
  }
});

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
