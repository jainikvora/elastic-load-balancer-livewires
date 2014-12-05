var repository = require('../data/repository');
var dbOperations = require('./db-operations');

var model =  {
	
	addNode: function(address) {
		repository.addresses.push(address);
		dbOperations.addNode(address);
	},

	deleteNode: function(address) {
		dbOperations.deleteNode(address);
		repository.addresses.forEach(function(obj) {
			if(obj.host == address.host && obj.port == address.port) {
				repository.addresses.splice(repository.addresses.indexOf(obj),1);
			}

			/*else
			{
				console.log("Request not given in correct format");
			}*/
		});
	},

	updateGzipThreshold: function(value) {
		repository.gzipThreshold = value;
		dbOperations.updateGzipThreshold(value);
	},

	getGzipThreshold: function() {
		return repository.gzipThreshold;
	},

	getGzip: function() {
		return repository.gzip;
	},

	getNodes: function() {
		if(repository.addresses!= 0)
		{
		return repository.addresses;
	    }
	  /*  else
	    {
	    	console.log("Repository is empty");
	    }*/

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
			/*else
			{
				console.log("Node not found"); 
			}*/
		});
		return found;
	},
	
	updateForward: function(address) {
		repository.proxyConfig.forward = address;	
		dbOperations.updateForward(address);	
		console.log("Proxy Config: --");
		console.log(repository.proxyConfig);		
	},

	getForward: function() {
		return repository.proxyConfig.forward;
	},
	
	deleteForward: function() {
		repository.proxyConfig.forward = {};
		
	},
	
	setProxyConfig: function(address) {
		repository.proxyConfig.target = address; 
	},
	
	getProxyConfig: function() {
		return repository.proxyConfig;
	},

	getLatency: function() {
		return repository.latency;
	},
	
	updateLatency: function(value) {
		repository.latency = value;
		dbOperations.updateLatency(value);
	}
	
};

module.exports = model;