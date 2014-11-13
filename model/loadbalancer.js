repository = require('../data/repository');

var model =  {
	
	addNode: function(address) {
		repository.addresses.push(address);
	},

	deleteNode: function(address) {
		repository.addresses.forEach(function(obj) {
			if(obj.host == address.host && obj.port == address.port) {
				repository.addresses.splice(repository.addresses.indexOf(obj));
			}
		})
	},

	updateGzipThreshold: function(value) {
		repository.gzipThreshold = value;
	},

	getGzipThreshold: function() {
		return repository.gzipThreshold;
	},

	getNodes: function() {
		return repository.addresses;
	},

	getFirstNode: function() {
		return repository.addresses.shift();
	},

	checkNodeExists: function(address) {
		var found = false;
		repository.addresses.forEach(function(obj) {
			if(obj.host == address.host && obj.port == address.port) {
				found = true;
			}
		})
		return found;
	}
}

module.exports = model;