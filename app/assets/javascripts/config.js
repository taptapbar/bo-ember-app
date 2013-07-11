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
		xAxis: { max: 10 },
		scrollbar: { enabled: true }
	},

	multiview: {
		// Please do not change this restfulURL unless you want to change the model name
		/************************************************************
		// Use model name as URL to fit RESTful convention
		// FindALL	GET 	big_object_views.json
		// Find 	GET 	big_object_views/:id.json
		// UPDATE 	PUT 	big_object_views/:id.json
		// CREATE 	POST 	big_object_views.json
		// DESTROY	DELETE 	big_object_views/:id.json
		/************************************************************/
		restfulURL: "big_object_views/",
	
		// Request a new ID at create-new-view, for newly created but not saved in the database big_object_view.
		newIdURL: "big_object_views/new_id/"

		//Request Dimensions & Measures

	}

		
};