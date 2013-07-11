var appConfig = {

	server: {
		URL: "http://localhost:3000/"
	},

	store: {
		adapter: {
			// Data Store's URL prefix ex. "api/v1"
			URL: ""
		}
	},

	chartSettings: {
		xAxis: { max: 10 }, // Maximum number of columns user can see within the chart width
		scrollbar: { enabled: true } // enable/disable the scrollbar
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
		bigObjectViewRestfulURL: "big_object_views/",


		//Request the Dimensions & Measures list
		dimensionsAndMeasuresURL: "big_object_views/dimensions_and_measures",

		// Request the data needed to draw in highchart/highstock
		fetchChartDataURL: "fetch_chart_data/",

		// Request a new ID at create-new-view, for newly created but not saved in the database big_object_view.
		newIdURL: "big_object_views/new_id/"

	}

		
};