$(document).ready(function () {

	//fullpage scrolling
	$('#fullpage').fullpage({
		scrollingSpeed: 600
	});

	$( "#submit1_btn" ).click(function() {
		var $input = $("#input1").val();
	  	console.log($input);
	});


});