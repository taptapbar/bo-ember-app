App.ColumnChartView = App.ChartView.extend({
  type: 'column'
});

/************************************************************
Trigger deleteBOViewInstance(id) when user click on 
"x" button of chart tabs, and remove the current tab as well.
/************************************************************/

// closing tabs will trigger DELETE BOViewInstance action
$(document).on('click', '#view-container > .tabs .icon', function (event) {
	var id = $(this).find('span').text();
	var currentTab = $(this).parent();
	deleteBOViewInstance(id).then(function (response) {
		removeTab(currentTab);
		
		
	});
});

function deleteBOViewInstance(id) {
	return $.ajax({
		url: appConfig.server.URL+ appConfig.store.adapter.URL + appConfig.multiview.restfulURL + id + ".json",
		type: "DELETE",
	}).then(
      function(response) {
        // deleting succeeded
        console.log("fetchChartData success");
        return "success";
      },
      function(error) {
        // deleting failed
        console.log("fetchChartData failed");
      }
    );
};

function removeTab(tab) {
	var nextTab = tab.nextAll("div").first();
	if(nextTab.hasClass("add-view-btn")) {
		if (tab.prevAll('div').length !== 0)
		nextTab = tab.prevAll('div').first();
	}
	tab.prev().remove();
	tab.next().remove();
	tab.remove();
	nextTab.find('a').click();
};

/************************************************************
// Change control icons' background color when tabs' status change
/************************************************************/

$(document).on('click', '#view-container > .tabs a', function (event) {
	checkChartTabs();
});

function checkChartTabs() {
	$("#view-container > .tabs a").siblings().removeClass("active");
	$("#view-container > .tabs a[class*=active]").siblings().addClass("active");
};

// Change style on hover
$(document).on(
{
    mouseenter: function() 
    {
        $(this).css("color", "#fff").css("cursor", "pointer");
    },
    mouseleave: function()
    {
        $(this).css("color", "#666");
    }
}, '#view-container div[class*=icon]');