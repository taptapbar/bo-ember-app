App.FilterModalView = Ember.View.extend({
  //layoutName : 'layouts/modal',
  templateName : 'filter',
  showHeader: true,
  model: null,
  filterList: null,

  close: function() {
    this.destroy();
  }
});

$(document).on('click', "input[class='toggler']", function() {
	//console.log('checkbox clicked');
	var self = this;
	$.each($(this).siblings(".toggleable-panel"), function (index, item) {
		//console.log($(item).data('panel'));
		if($(item).data('panel') == $(self).val()) {
			$(item).toggle('blind', 200);
		}
	})
});