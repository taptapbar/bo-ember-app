var colorPalete = {
		0: ["#3366cc","#dc3912","#ff9900","#109618","#990099","#0099c6","#dd4477","#66aa00","#b82e2e","#316395","#994499","#22aa99","#aaaa11","#6633cc","#e67300","#8b0707","#651067","#329262","#5574a6","#3b3eac","#b77322","#16d620","#b91383","#f4359e","#9c5935","#a9c413","#2a778d","#668d1c","#bea413","#0c5922","#743411"],
		1: ["#2f69bf", "#a2bf2f", "#bf5a2f", "#bfa22f", "#772fbf", "#bf2f2f", "#00337f", "#657f00", "#7f2600", "#7f6500"],
		// 2 is nice for a piechart with calculated hue value
		2: ["#8a56e2","#cf56e2","#e256ae","#e25668","#e28956","#e2cf56","#aee256","#68e256","#56e289","#56e2cf","#56aee2","#5668e2"]
	};

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
		chart: {
			minHeight: 300 // unit in px
		},
		xAxis: { 
			maxColumn: 30, // Maximum number of columns user can see within the chart width
			maxGroup: 12, // Show rotated labels when group number reach maxGroup
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
			enabled: true //default tooltip is for individual serie value
			stackNameLength: 10,
		},

		stackLabels: {
			rotation: -40,
			color: "#08c",
			length: 6,
		},

		//colors: ["#2f69bf", "#a2bf2f", "#bf5a2f", "#bfa22f", "#772fbf", "#bf2f2f", "#00337f", "#657f00", "#7f2600", "#7f6500"]
		colors: colorPalete[0]
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
		filterListURL: "big_object_views/:id/filter_list",

		zkURL: "multiview/:id/zk"

	},

	filter: {
		maxFiltersPerColumn: 4
	}	
};