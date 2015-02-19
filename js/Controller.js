var Controller = {
	le_input:null, 
	selected_node:null,

	init: function() {
		Model.initData(function(bubbleData, regionList) {
			// Create the Bubble Viz here Here
			BubbleViz.draw(bubbleData);
			Controller.autocomplete(regionList);
			Controller.hover_bubble();
			Controller.hover_bubble_click();
			Model.populate_stats();

		})

	},

	autocomplete: function(regionList) {
		$( "#input1" ).autocomplete({
			source: regionList
		}),

		$("#input1").autocomplete({
		    source: function(request, response) {
		        var results = $.ui.autocomplete.filter(regionList, request.term);

		        response(results.slice(0, 5));
		    }
		});
	},

	updatebubble: function(regionList) {
		$( "#submit1_btn" ).click(function() {
			Controller.le_input = $("#input1").val();
			Model.districtNames = Model.getDistrictNames(Controller.le_input);
			data = Model.getBubbleData2(Controller.le_input);

			BubbleViz.draw(data);
			$("#bubble").css("font-size", "1.75em");
			Controller.hover_bubble();
			Controller.hover_bubble_click();
			Model.populate_stats();
		});
	},
	hover_bubble: function(regionList) {
		var old_color;
		$( "#BubbleViz .node" ).hover( function() {
			if($( this ).find("circle").css("fill") != "rgb(240, 0, 0)"){
		  		old_color = $(this ).find("circle").css("fill");
		    	$( this ).find("circle").css("fill", "white") ;
		    	$( this ).find("circle").css("cursor", "pointer");
		    }
		  }, function() {
		  		if($( this ).find("circle").css("fill") != "rgb(240, 0, 0)"){
				    $( this ).find("circle").css("fill", old_color) ;
				    $( this ).find("circle").css("cursor", "mouse");
				}
		  }
		);
	},

	hover_bubble_click: function(regionList) {
		$( "#BubbleViz .node" ).click( function() {

			var node = $( this ).find("circle").css("fill", "rgb(240, 0, 0)");
			if(Controller.selected_node != null){
				Controller.selected_node.css("fill", "rgb(49, 130, 189)");
			}
			Controller.selected_node = $( this ).find("circle");
			$("#info").css("visibility", "visible");
			var name = $("#BubbleViz .node").children().html().replace(': ', '');
			var number_enrolled = Model.stats[name].number_enrolled;
			$("#stats1").html(number_enrolled);

			name = $("#BubbleViz .node").children().html().replace(': ', '');
			number_enrolled = Model.stats[name].number_teaching_staff;
			$("#stats2").html(number_enrolled);

			name = $("#BubbleViz .node").children().html().replace(': ', '');
			number_enrolled = Model.stats[name].avg_national_rank;
			$("#stats3").html(number_enrolled);

			name = $("#BubbleViz .node").children().html().replace(': ', '');
			number_enrolled = Model.stats[name].number_pass;
			$("#stats4").html(number_enrolled);

			name = $("#BubbleViz .node").children().html().replace(': ', '');
			number_enrolled = Model.stats[name].percentage_pass_change;
			$("#stats5").html(number_enrolled);
		});

	}
}

Controller.init();