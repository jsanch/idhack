$(document).ready(function () {

	//fullpage scrolling
	$('#fullpage').fullpage({
		scrollingSpeed: 600,
		keyboardScrolling: false
	});

	$( "#submit1_btn" ).click(Controller.updatebubble());

	$("#input1").keyup(function(event){
	    if(event.keyCode == 13){
	        $("#submit1_btn").click();
	        $("#input1").val("");
	    }
	});

});