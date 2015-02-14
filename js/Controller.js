var Controller = {
	le_input:null, 

	init: function() {
		// console.log("controller.init");
		Model.initData(function(bubbleData, regionList) {
			// Create the Bubble Viz here Here
			// console.log("draw");
			BubbleViz.draw(bubbleData);
			// console.log(regionList);
			Controller.autocomplete(regionList);
		})

	},

	autocomplete: function(regionList) {
		$( "#input1" ).autocomplete({
			source: regionList
		}),

		$("#input1").autocomplete({
		    source: function(request, response) {
		        var results = $.ui.autocomplete.filter(regionList, request.term);

		        response(results.slice(0, 8));
		    }
		});
	},

	updatebubble: function(regionList) {
		console.log("hello");
		$( "#submit1_btn" ).click(function() {
			Controller.le_input = $("#input1").val();
			Model.districtNames = Model.getDistrictNames(Controller.le_input);
			data = Model.getBubbleData2(Controller.le_input);
			console.log("kjbdlajksdf");
			console.log(data);
			
			BubbleViz.draw(data);
		});

		// $( "#input1" ).autocomplete({
		// 	source: regionList
		// }),

		// $("#input1").autocomplete({
		//     source: function(request, response) {
		//         var results = $.ui.autocomplete.filter(regionList, request.term);

		//         response(results.slice(0, 8));
		//     }
		// });
	}


}

Controller.init();