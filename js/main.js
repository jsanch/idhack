
$(document).ready(function () {

	//fullpage scrolling
    $('#fullpage').fullpage({
    	scrollingSpeed: 500,
    	paddingBottom: '3em'
    	// anchors: anchors,
    	// animateAnchor: true
    	// onLeave: function(index, nextIndex, direction)
    	// {
     //        var difference = Math.abs(nextIndex - index);
     //        if(difference >= 2){
     //        	$( ".section" ).fadeOut(300, function() {}).delay(700);
     //        	$( ".section" ).fadeIn(400, function() {});
     //        }
     //        else {
     //        	// uncomment for fade when scrolling bordering projects
     //        	// $( ".section:eq(" + (index-1) + ")" ).fadeTo(1250, 0).delay(250);
     //        	// $( ".section:eq(" + (index-1) + ")" ).fadeTo("fast", 1);
     //        }
     //    }
    });

});