function sortableConnectList(selector) {
	$(selector).sortable({
      placeholder: "ui-state-highlight",
      connectWith: ".connectedSortable",
      receive: function( event, ui ) {
      	var originHTML = ui.item[0].innerHTML
      	var deleteIconHTML = '<div class="delete-white pull-right">x</div>'
      	ui.item[0].innerHTML = toggleString(originHTML, deleteIconHTML);
      }
    }).disableSelection();
}
function toggleString(originString, matchString) {
	if(originString.match(matchString)) { return originString.replace(matchString, ""); }
	else { return originString.concat(matchString); }
}
function togglePanel(selectorPrefix) {
	$('#'+selectorPrefix+'-panel').toggle('blind', 300, function() {
    	if($('#'+selectorPrefix+'-toggler').hasClass('i-minus-white')) {
    		$('#'+selectorPrefix+'-toggler').removeClass("i-minus-white").addClass("i-plus-white");
    	} else {
    		$('#'+selectorPrefix+'-toggler').removeClass("i-plus-white").addClass("i-minus-white");
    	}  	
    });
}

// Json data for dimension&measurement : http://www.json-generator.com/j/eOUr?indent=4
$(document).on('click', '.add-view-btn', function(event){
    sortableConnectList("#sortable-di-list, #sortable-di-selected");
});
$(function() {
	sortableConnectList("#sortable-di-list, #sortable-di-selected");
});
$(document).on('click', '#create-view-filter-toggler', function(event) {    
    togglePanel('create-view-filter');
    return false;
});
$(document).on('click', '#create-view-timescope-toggler', function(event) {    
    togglePanel('create-view-timescope');
    return false;
});