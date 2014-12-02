var repository = require('../data/repository');


var model =  {
	
	addNode: function(address) {
		repository.addresses.push(address);
	},

	deleteNode: function(address) {
		repository.addresses.forEach(function(obj) {
			if(obj.host == address.host && obj.port == address.port) {
				repository.addresses.splice(repository.addresses.indexOf(obj),1);
			}
		})
	},

	updateGzipThreshold: function(value) {
		repository.gzipThreshold = value;
	},

	getGzipThreshold: function() {
		return repository.gzipThreshold;
	},

	getGzip: function() {
		return repository.gzip;
	},

	getNodes: function() {
		return repository.addresses;
	},

	getFirstNode: function() {
		return repository.addresses.shift();
	},

	checkNodeExists: function(address) {
		var found = false;
		console.log('in checkNodeExists', address )
		repository.addresses.forEach(function(obj) {
			if(obj.host == address.host && obj.port == address.port) {
				found = true;
			}
		});
		return found;
	},
	
	updateForward: function(address) {
		repository.proxyConfig.forward = address;		
		console.log("Proxy Config: --");
		console.log(repository.proxyConfig);		
	},

	getForward: function() {
		return repository.proxyConfig.forward;
	},
	
	deleteForward: function() {
			console.log('proxy config before delete forward.. ', repository.proxyConfig);
			repository.proxyConfig.splice("forward",1);								
			console.log('proxy config after forward deleted.. ', repository.proxyConfig);
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
	}
	
};

module.exports = model;