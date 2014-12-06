var cuid = require('cuid');

var util = {
	//Call function to generate unique request ID
	generateRequestId: function(){	
		return cuid();
	},

	getExecutionTime: function(startTime,endTime){
		return endTime-startTime;
	},

    isEmpty: function(val){
        return (val === undefined || val == null || val.length <= 0) ? true : false;
    }

}

module.exports = util;