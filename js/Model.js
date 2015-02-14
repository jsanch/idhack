var Model = {
	bubbleData:null,
	schoolData:null,
	regionNames:null,
	districtNames:null,
	popData:null,
	waterData:null,
	stats:null,

	initData: function(callback) {

	    Model.bubbleData = null;

	    // LOAD ALL WE NEED
	    
	    $.get("https://communities.socrata.com/resource/rd25-4b5p.json?$$app_token=qqWOL1eWwrOBiLADaJ0cKz1j5&$limit=20011", function( data ) {

        	Model.schoolData = data;

			Model.bubbleData =  Model.getBubbleData(); 

        	Model.regionNames = Model.getRegionNames();

			callback.call(window, Model.bubbleData, Model.regionNames);

			Model.stats = Model.getDistrictStats(); 

			Model.populate_stats();

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
	},

	getDistrictNames: function(region) {


		districtNames = new Object();
		for (var i = Model.schoolData.length - 1; i >= 0; i--) {
			if ( Model.schoolData[i].region == region) {
				districtNames[Model.schoolData[i].district] = "";
			}
		}
		districtList = []
		for (var district in districtNames) {
			districtList.push(district);
		}
		return districtList;
	}, 

	getBubbleData2: function(region) {

		districtList = Model.getDistrictNames(region);
		obj = []

		for (var row in Model.bubbleData.children){
			for ( var item in districtList){
				if ( Model.bubbleData.children[row].name ==  districtList[item] ) {
					obj.push(Model.bubbleData.children[row]);
				}
			}
		}

	    newbubbledata = {"name" : "bubble", "children": obj}

		return newbubbledata;

	}, 

	populate_stats: function() {

		$( "#BubbleViz .node" ).click( function() {

			var name = $(this).find("title").html().replace(': ', '');
			console.log(name);
			var number_enrolled = Model.stats[name].number_enrolled;
			$("#stats1").html(number_enrolled);

			number_enrolled = Model.stats[name].number_teaching_staff;
			$("#stats2").html(number_enrolled);

			number_enrolled = Model.stats[name].avg_national_rank;
			$("#stats3").html(number_enrolled);

			number_enrolled = Model.stats[name].number_pass;
			$("#stats4").html(number_enrolled);

			number_enrolled = Model.stats[name].percentage_pass_change;
			$("#stats5").html(number_enrolled);
		});


	}, 

	getDistrictStats: function() {
		districtstats = new Object();
		temp7 = 0;

		for (var i = Model.schoolData.length - 1; i >= 0; i--) {
			if (districtstats[Model.schoolData[i].district] === undefined) {
				temp1 = 0;
				temp2 = 0;
				temp3 = 0;
				temp4 = 0;
				temp5 = 0;
				temp6 = 0;
			} else {
				if(isNaN(districtstats[Model.schoolData[i].district].number_enrolled) === false){
                	temp1  = parseInt(districtstats[Model.schoolData[i].district].number_enrolled)
				}
				if(isNaN(districtstats[Model.schoolData[i].district].number_pass) === false){
					temp2  = parseInt(districtstats[Model.schoolData[i].district].number_pass)
				}
				if(isNaN(districtstats[Model.schoolData[i].district].percentage_pass_change) === false){
					temp3  = parseInt(districtstats[Model.schoolData[i].district].percentage_pass_change)
				}
				if(isNaN(districtstats[Model.schoolData[i].district].percentage_pass) === false){
					temp4  = parseInt(districtstats[Model.schoolData[i].district].percentage_pass)
				}
				if(isNaN(districtstats[Model.schoolData[i].district].national_rank) === false){
					temp5  = parseInt(districtstats[Model.schoolData[i].district].national_rank)
					temp7 += 1;
				}
				if(isNaN(districtstats[Model.schoolData[i].district].number_teaching_staff) === false){
					temp6  = parseInt(districtstats[Model.schoolData[i].district].number_teaching_staff)
				}

			}
			districtstats[Model.schoolData[i].district] = {"number_enrolled" : temp1,
														   "number_pass": temp2,
    														"percentage_pass_change": temp3,
    														"percentage_pass": temp4,
    														"national_rank": temp5,
    														"number_teaching_staff": temp6,
    														"school_count": temp7 
    														}


			districtstats[Model.schoolData[i].district].number_enrolled += parseInt(Model.schoolData[i].number_enrolled);
			districtstats[Model.schoolData[i].district].number_pass += parseInt(Model.schoolData[i].number_pass);
			districtstats[Model.schoolData[i].district].percentage_pass_change += parseInt(Model.schoolData[i].percentage_pass_change);
			districtstats[Model.schoolData[i].district].percentage_pass += parseInt(Model.schoolData[i].percentage_pass);
			districtstats[Model.schoolData[i].district].national_rank += parseInt(Model.schoolData[i].national_rank);
			districtstats[Model.schoolData[i].district].number_teaching_staff += parseInt(Model.schoolData[i].number_teaching_staff);
			districtstats[Model.schoolData[i].district].school_count  += temp7; 


		}

		for (var district in districtstats) {
			districtstats[district].avg_national_rank = Math.round(districtstats[district].national_rank / districtstats[district].school_count); 
	     } 
		return districtstats;
	}

}

var globalvar = null; 