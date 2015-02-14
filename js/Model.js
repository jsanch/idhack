var Model = {
	bubbleData:null,
	schoolData:null,
	popData:null,
	waterData:null,

	initData: function(callback) {

		console.log("initData");
	    Model.bubbleData = null;

	    // LOAD ALL WE NEED
	    $.get("https://communities.socrata.com/resource/rd25-4b5p.json?$$app_token=qqWOL1eWwrOBiLADaJ0cKz1j5", function( data ) {
        	schoolData = data;
        	console.log(schoolData);
        
		    console.log("hello");
			bubbleData =  Model.getBubbleData(); 

			callback.call(window, Model.bubbleData);

        }); 



	},


	loadBubbleData: function () {
		/// GEORGE GOES HERE.
		/// 
		console.log("load the data");
	},

	loadPopData: function (popDate) {
		date = popDate;
		url = "http://api.population.io/1.0/population/Tanzania/" + date + "2014-12-1/?format=json"; 
		$.get(url, function(data) {
			popData = data;
		});
	},

	loadWaterData: function () {
		$.get("https://communities.socrata.com/resource/npaw-5hb4.json?$$app_token=qqWOL1eWwrOBiLADaJ0cKz1j5", function(data) {
			waterData = data;
		});
	},

	aggregateRegionSchoolData: function () {
		regions = {}

		// for(i in schoolData) {

		// }
	},

	getBubbleData: function() {
		console.log(Model.schoolData);

	}




}
