var appConfig = {

	store: {
		adapter: {
			// Data Store's server URL
			URL: ["http://", location.host].join(''),
			// Data Store's URL prefix ex. "api/v1"
			namespace: "",
		}
	},

	chartSettings: {
		xAxis: { 
			maxColumn: 30, // Maximum number of columns user can see within the chart width
			labels: { // How to display the labels of xAxis (which means categories)
				rotation: -20, //default value is 0
				align: "right" //default value is "center"
			}
		}, 
		//scrollbar: { enabled: true } // enable/disable the scrollbar

		plotOptions: {
			column: {
				groupPadding: 0.2, // Width between each group, default value is 0.2
				pointPadding: 0, //Width between each bar/column, default value is 0.1
			}
		},

		groupTooltip: {
			enabled: false //default tooltip is for individual serie value
		}
	},

	multiview: {
		// Please do not change this restfulURL unless you want to change the model name
		/************************************************************
		// Use model name as URL to fit RESTful convention
		// Action	Method	URL
		//
		// INDEX	GET 	big_object_views.json
		// SHOW 	GET 	big_object_views/:id.json
		// UPDATE 	PUT 	big_object_views/:id.json
		// CREATE 	POST 	big_object_views.json
		// DESTROY	DELETE 	big_object_views/:id.json
		/************************************************************/
		bigObjectViewRestfulURL: "big_object_views",


		//Request the Dimensions & Measures list
		dimensionsAndMeasuresURL: "big_object_views/dimensions_and_measures",

		// Request the data needed to draw in highchart/highstock
		// :id is a variable which will be replaced by a real id when fetching chart_data at runtime
		fetchChartDataURL: "big_object_views/:id/fetch_chart_data",

		// Request a new ID at create-new-view, for newly created but not saved in the database big_object_view.
		newIdURL: "big_object_views/new_id",

		//Request the filter_list for rendering filter fields
		// :id is a variable which will be replaced by a real id when fetching filter_list at runtime
		filterListURL: "big_object_views/:id/filter_list"

	}

		
};