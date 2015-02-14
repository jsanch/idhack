var Model = {
	bubbleData:null,
	schoolData:null,
	regionNames:null,
	popData:null,
	waterData:null,

	initData: function(callback) {

	    Model.bubbleData = null;

	    // LOAD ALL WE NEED
	    
	    $.get("https://communities.socrata.com/resource/rd25-4b5p.json?$$app_token=qqWOL1eWwrOBiLADaJ0cKz1j5&$limit=20011", function( data ) {

        	Model.schoolData = data;
        	// console.log(Model.schoolData);
      


			Model.bubbleData =  Model.getBubbleData(); 

        	Model.regionNames = Model.getRegionNames();

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

		bubbleData = new Object();
		for (var i = Model.schoolData.length - 1; i >= 0; i--) {

			if (bubbleData[Model.schoolData[i].district] === undefined) {
				temp1 = 0;
				temp2 = 0;
			} else {
                temp1  = parseInt(bubbleData[Model.schoolData[i].district].candidates)

				temp2  = parseInt(bubbleData[Model.schoolData[i].district].number_pass)
			}


			bubbleData[Model.schoolData[i].district] = {"candidates" : temp1, "number_pass": temp2} ;


			bubbleData[Model.schoolData[i].district].candidates += parseInt(Model.schoolData[i].candidates); 
			bubbleData[Model.schoolData[i].district].number_pass += parseInt(Model.schoolData[i].number_pass);


		}

		for (var district in bubbleData) {
			bubbleData[district].average = bubbleData[district].number_pass / bubbleData[district].candidates ; 
	     } 


		// NEED TO MAKE A LIST OF OBJECTS. 
		group = []
		for (var district in bubbleData) {
			group.push( {"name":district,"size":bubbleData[district].average }); 
		}

		newbubbledata = {"name" : "bubble", "children": group}

		return newbubbledata;

	}, 

	getRegionNames: function() {

		regionNames = new Object();
		for (var i = Model.schoolData.length - 1; i >= 0; i--) {
			regionNames[Model.schoolData[i].region] = "" ;
		}

		regionlist =[]
		for (var region in regionNames) {
			regionlist.push(region);
		}


		return regionlist;

	}






}
