var cuid = require('cuid');

var util = {
	//Call function to generate unique request ID
	generateRequestId: function(){	
		return cuid();
	},

	getExecutionTime: function(startTime,endTime){
		return endTime-startTime;
	}

}

module.exports = util;