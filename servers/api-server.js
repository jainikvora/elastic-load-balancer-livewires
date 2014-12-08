var express= require('express')
	, bodyParser = require('body-parser')
	, loadBalancerRoutes = require('../routes/loadbalancer')
    , healthcheckroute = require('../routes/healthcheckroute')
	, util = require('util')
	, colors = require('colors')
    , dashBoardRoute = require('../routes/dashboard')
    , path = require('path')
    , expressSession = require('express-session');

function restController() {

	var app = express();

    app.set('view engine', 'ejs');

    app.set('views',process.cwd()+"/views");

    app.use(express.static(path.join(process.cwd(),"public")));

    app.use(bodyParser.urlencoded({ extended: false }));

    app.use(expressSession({secret:'007',saveUninitialized: true,resave: true}));

	app.use(bodyParser.json()); 

	app.use('/api/v1/loadbalancer',loadBalancerRoutes);

    app.use('/api/v1/healthcheck',healthcheckroute);

    app.use('/',dashBoardRoute);

	app.listen(8004);

	util.puts('Express server '.blue + 'started '.green.bold + 'on port '.blue + '8004 '.yellow);

   app.use(function(err, req, res, next)
   {
    console.error(err.stack);
    res.status(500).send('Something went wrong hence action cannot be executed');
   });

}

module.exports = new restController();