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

        	Model.schoolData = data;
        	// console.log(Model.schoolData);
        	for (var i = 0; i < Model.schoolData.length; i++) {
        		console.log(Model.schoolData[i]["region"]);
        	};

        
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
		console.log("hello2");
		//console.log(Model.schoolData)

		bubbleData = new Object();
		// for (i = 0; i < 30; i++) {
		// 	bubbleData[i] = new Object();
		// 	bubbleData[i] = {"candidates" : "0","number_pass":"0"}
		// }

		// curr = 0;
		// last = "Arusha"

		for (var i = Model.schoolData.length - 1; i >= 0; i--) {

			if (bubbleData[Model.schoolData[i].region] === undefined) {
				temp1 = 0;
				temp2 = 0;
			} else {
                temp1  = parseInt(bubbleData[Model.schoolData[i].region].candidates)
                			console.log(bubbleData[Model.schoolData[i].region].candidates);

				temp2  = parseInt(bubbleData[Model.schoolData[i].region].number_pass)
			}


			bubbleData[Model.schoolData[i].region] = {"candidates" : temp1, "number_pass": temp2} ;


			bubbleData[Model.schoolData[i].region].candidates += parseInt(Model.schoolData[i].candidates); 
			bubbleData[Model.schoolData[i].region].number_pass += parseInt(Model.schoolData[i].number_pass);



		}

		for (var region in bubbleData) {
			console.log(region);
			bubbleData[region].average = bubbleData[region].number_pass / bubbleData[region].candidates ; 
	     } 
		console.log("hi");
		console.log(bubbleData);
	}




}
