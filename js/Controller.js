var Controller = {


	init: function() {
		console.log("controller.init");
		Model.initData(function(bubbleData) {
			// Create the Bubble Viz here Here
			console.log("draw");
			BubbleViz.draw(bubbleData);

		})

	}


}

Controller.init();