getRatios: function() {

		bubbleData = new Object();
		for (var i = Model.schoolData.length - 1; i >= 0; i--) {

			if (bubbleData[Model.schoolData[i].district] === undefined) {
				temp1 = 0;
				temp2 = 0;
			} else {
                temp1  = parseInt(bubbleData[Model.schoolData[i].district].number_enrolled)
				temp2  = parseInt(bubbleData[Model.schoolData[i].district].number_teaching_staff)
			}	
			currentRat = temp1 / temp2;
			x = temp1 / 51712510;
			future = x*66506000;
			maintain = currentRat / future;

			bubbleData[Model.schoolData[i].district] = {"current":currentRat,"2023":future,"maintain":maintain};


			bubbleData[Model.schoolData[i].district].candidates += parseInt(Model.schoolData[i].candidates); 
			bubbleData[Model.schoolData[i].district].number_pass += parseInt(Model.schoolData[i].number_pass);


		}

		for (var district in bubbleData) {
			bubbleData[district].average = bubbleData[district].number_pass / bubbleData[district].candidates ; 
	     } 


		// NEED TO MAKE A LIST OF OBJECTS. 
		group = []
		for (var district in bubbleData) {
			group.push( {"name":district,"size":bubbleData[district].average }); 
		}

		newbubbledata = {"name" : "bubble", "children": group}

		return newbubbledata;

	}