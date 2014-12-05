var express= require('express')
	, bodyParser = require('body-parser')
	, loadBalancerRoutes = require('../routes/loadbalancer')
	, util = require('util')
	, colors = require('colors');

function restController() {

	var app = express();
	app.use(bodyParser.json()); 

	app.use('/api/v1/loadbalancer',loadBalancerRoutes);	
	app.listen(8004);
	util.puts('Express server '.blue + 'started '.green.bold + 'on port '.blue + '8004 '.yellow);
}

module.exports = new restController();