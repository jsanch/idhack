$(document).ready(function () {

	// var regions = [];
	
	$( "#input1" ).autocomplete({
		source: regions
	});

	//fullpage scrolling
	$('#fullpage').fullpage({
		scrollingSpeed: 600
	});

	$( "#submit1_btn" ).click(function() {
		var $input = $("#input1").val();
	  	console.log($input);
	});


});