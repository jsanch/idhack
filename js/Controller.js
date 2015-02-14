var Controller = {


	init: function() {
		console.log("controller.init");
		Model.initData(function(bubbleData, regionList) {
			// Create the Bubble Viz here Here
			console.log("draw");
			BubbleViz.draw(bubbleData);
			console.log(regionList);
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
	}


}

Controller.init();