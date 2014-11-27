var express= require('express'),
	bodyParser = require('body-parser'),
	simpleProxy = require('../routes/proxy'),
	loadBalancerRoutes = require('../routes/loadbalancer');

function restController() {
	//
	// A simple round-robin load balancing strategy.
	//
	// First, list the servers you want to use in your rotation.
	//
	var app = express();
	app.use(bodyParser.json()); 

	app.use('/api/v1/loadbalancer',loadBalancerRoutes);
	app.use('/api/v1/proxy',simpleProxy);
	app.listen(8004);

}

module.exports = new restController();