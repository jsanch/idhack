var Controller = {
	le_input:null, 

	init: function() {
		Model.initData(function(bubbleData, regionList) {
			// Create the Bubble Viz here Here
			BubbleViz.draw(bubbleData);
			Controller.autocomplete(regionList);
			Controller.hover_bubble();
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
		$( "#submit1_btn" ).click(function() {
			Controller.le_input = $("#input1").val();
			Model.districtNames = Model.getDistrictNames(Controller.le_input);
			data = Model.getBubbleData2(Controller.le_input);
			console.log(data);

			BubbleViz.draw(data);
			$("#bubble").css("font-size", "1.75em");
			Controller.hover_bubble();
		});
	},
	hover_bubble: function(regionList) {
		var old_color;
		$( "#BubbleViz .node" ).hover(
		  function() {
		  	old_color = $(this ).find("circle").css("fill");
		    $( this ).find("circle").css("fill", "white") ;
		    $( this ).find("circle").css("cursor", "pointer");
		  }, function() {
		    $( this ).find("circle").css("fill", old_color) ;
		    $( this ).find("circle").css("cursor", "mouse");
		  }
		);
	}

}

Controller.init();