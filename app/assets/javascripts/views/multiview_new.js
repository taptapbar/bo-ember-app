/******************************
For Dragable dimension list and 
toggle panels of Filter and TimeScope
/******************************/
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

/******************************
Request a new ID from server to create a new BigObjectView
which will add a new tab automatically. Redirect to the
new tab just created at completed
/******************************/
function createNewBOViewInstance() {
  // Send create request and get response with id attr
  title = $('#create-new-view-title').val();
  measure = $('input[name="measure"]:checked').val().capitalize();
  dimensions = [];
  $('#sortable-di-selected li[class*=option]:lt(3)').each(function(index) {
      dimensions.push($(this).text().slice(0, -1));
  });
  var params = {dimensions: dimensions, measure: measure, title: title};
  console.log(params);
  newBOViewID(params).then(function (chartID) {
    params.id = chartID;
    try {
      if(App.BigObjectView.find().filterProperty('id', chartID).length == 0) {
        App.BigObjectView.createRecord(params);
      }
      else console.log("The ID:" + chartID + " has been used");
    }
    catch(err) {
      // if the hs been used, this error will be thrown out
      console.log(err);
      alert("Something went wrong at creating new charts");
    }
    finally {
      return document.location = "/#/multiview/"+chartID;
    }
  });
}
function newBOViewID(params) {
  // return ID 8 http://www.json-generator.com/j/eTrf?indent=4
  // return ID 9 http://www.json-generator.com/j/eTKr?indent=4
  var url = ($('#create-new-view-title').val() == '8' ? "http://www.json-generator.com/j/eTrf?indent=4" : "http://www.json-generator.com/j/eTKr?indent=4");
  return $.getJSON(url).then(
    function(response) {
      //fetching ID success
      return response.result[0].id;
    },
    function(error) {
      // fetching failed
      console.log("fetchChartData failed");
    }
  );
}

/******************************
Hook up relevant click/keypress events
/******************************/

// Json data for dimension&measure : http://www.json-generator.com/j/eOUr?indent=4
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
$(document).on('click', '#create-new-view-confirm', function(event) {
    return createNewBOViewInstance();
});
$(document).on('keydown', '#create-new-view-title', function(event) {
  if(event.keyCode == 13) {
    event.preventDefault();
    return createNewBOViewInstance();
  }
});
$(document).on('click', '#create-new-view-reset', function(event) {
  $('form').each(function (index) {
    this.reset();
  });
});