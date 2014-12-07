var repository = require('../data/repository')
	, dbOperations = require('./db-operations');

var model =  {
	
	addNode: function(address) {
		repository.addresses.push(address);
		//dbOperations.addNode(address);
	},

	deleteNode: function(address) {
		repository.addresses.forEach(function(obj)
		 {
			if(obj.host == address.host && obj.port == address.port)
			{
				repository.addresses.splice(repository.addresses.indexOf(obj),1);
			}
			
		});
		//dbOperations.deleteNode(address);
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
		if(repository.addresses.length != 0)
		{
			return repository.addresses;
	    }
	    else
	    {
	    	return "No node has been added";
	    }

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
		});
		return found;
	},
	
	updateForward: function(address) {
		repository.proxyConfig.forward = address;
		dbOperations.updateForward(address);
	},

	getForward: function() {
		return repository.proxyConfig.forward;
	},
	
	deleteForward: function() {
		dbOperations.deleteForward(repository.proxyConfig.forward);
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