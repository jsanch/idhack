var Model = {
	bubbleData:null,

	initData: function(callback) {

		console.log("initData");
	    Model.bubbleData = null;

	    // LOAD ALL WE NEED 
		bubbleData =  Model.loadBubbleData(); 

		callback.call(window, Model.bubbleData);

	},


	loadBubbleData: function () {
		/// GEORGE GOES HERE.
		/// 
		console.log("load the data");
	}



}
