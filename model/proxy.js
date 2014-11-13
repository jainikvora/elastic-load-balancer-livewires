repository = require('../data/repository');

var model =  {
	
	updateTarget: function(address) {
		repository.proxyConfig.target = address;
		console.log("Proxy Config: --");
		console.log(repository.proxyConfig);
	},

	updateForward: function(address) {
		repository.proxyConfig.forward = address;
		console.log("Proxy Config: --");
		console.log(repository.proxyConfig);		
	},

	updateLatency: function(value) {
		repository.latency = value;
	},

	getTarget: function() {
		return repository.proxyConfig.target;
	},

	getForward: function() {
		return repository.proxyConfig.forward;
	},

	getLatency: function() {
		return repository.latency;
	},

	getProxyConfig: function() {
		return repository.proxyConfig;
	}

}

module.exports = model;