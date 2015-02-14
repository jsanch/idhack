var Model = {
	bubbleData:null,
	allData:null,
	popData:null

	initData: function(callback) {

		console.log("initData");
	    Model.bubbleData = null;

	    // LOAD ALL WE NEED
	    $.get("https://communities.socrata.com/resource/rd25-4b5p.json?$$app_token=qqWOL1eWwrOBiLADaJ0cKz1j5", function( data ) {
        	allData = data;
        }); 
		bubbleData =  Model.loadBubbleData(); 

		callback.call(window, Model.bubbleData);

	},


	loadBubbleData: function () {
		/// GEORGE GOES HERE.
		/// 
		console.log("load the data");
	}

	loadPopData: function (popDate) {
		date = popDate;
		url = "http://api.population.io/1.0/population/Tanzania/" + date + "2014-12-1/?format=json"; 
		$.get(url, function(data) {
			popData = data;
		}
	}



}
