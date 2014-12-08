repository = require('../data/repository');

var model =  {	

	getLoadBalancerMenu : function() {
		return repository.menu;
	},

	checkUser : function(username, password) {
		var found = false;
		repository.user.forEach(function(obj) {
			if(obj.username == username && obj.password == password) {
				found = true;
			}
		});
		return found;
	}

}

module.exports = model;