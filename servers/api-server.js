var express= require('express'),
	bodyParser = require('body-parser'),	
	loadBalancerRoutes = require('../routes/loadbalancer');

function restController() {

	var app = express();
	app.use(bodyParser.json()); 

	app.use('/api/v1/loadbalancer',loadBalancerRoutes);	
	app.listen(8004);

}

module.exports = new restController();