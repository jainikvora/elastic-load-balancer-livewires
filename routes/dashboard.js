/**
 * Created By Utsav on 12/27/2014
 */

var express = require('express'),
	router = express.Router(),
	model = require('../model/dashboard'),
	loadBalancerModel = require('../model/loadbalancer'),
	healthcheckModel = require('../model/healthcheckmodel'),
	logger = require('../util/logger'),
	gzipModel = require('../model/gzip');

router.route('/')
.get(function(req,res){
	
	res.render('login',{"errorMessage" : ""});
	
});

router.route('/logout')
.get(function(req,res){
	
	res.render('login',{"errorMessage" : "You have been logged out successfully...!"});
	req.session.userName = null;
	
});

router.route('/authentication')
.post(function(req,res){

	var username = req.body.username;
    var password = req.body.password;
	if(model.checkUser(username, password)){
		req.session.userName = username;
		res.render('home',{
			loadBalancerMenuList: model.getLoadBalancerMenu(),			
			username : req.session.userName
		});
	}else{		
		res.render('login',{"errorMessage" : "Invalid user name or passowrd !!"});
	}

});

router.route('/authentication')
.get(function(req,res){	

	res.render('login',{"errorMessage" : "Please login to continue"});

});

router.route('/home')
.get(function(req,res){
	
	if(req.session.userName!="undefined" && req.session.userName!="" && req.session.userName!=null) {
	
		res.render('home',{
			loadBalancerMenuList: model.getLoadBalancerMenu(),		
			username : req.session.userName
		});
		
	}else{
		res.render('login',{"errorMessage" : "Please login to continue !!"});
	}
	
});



router.route('/loadbalancer/nodes/:action')
.get(function(req,res){
	
	logger.debug(req.session.userName);
	if(req.session.userName!="undefined" && req.session.userName!="" && req.session.userName!=null) {
		
		var action = req.params.action;		
		res.render('postServerConfiguration',{
			loadBalancerMenuList: model.getLoadBalancerMenu(),			
			username : req.session.userName,
			requestAction : action,
			currentVal : '',
			gzip : ''
		});
	
	}else{
		res.render('login',{"errorMessage" : "Please login to continue !!"});
	}
		
});

router.route('/loadbalancer/nodes')
.get(function(req,res){
	
	if(req.session.userName!="undefined" && req.session.userName!="" && req.session.userName!=null) {
		
		res.render('postServerConfiguration',{
			loadBalancerMenuList: model.getLoadBalancerMenu(),		
			username : req.session.userName,
			requestAction : 'show',
			currentVal : '',
			message : 'success',
			requestedData : {'nodes':loadBalancerModel.getNodes()}
		
		});
		
	}else{
		res.render('login',{"errorMessage" : "Please login to continue !!"});
	}
	
});

router.route('/loadbalancer/gzip/threshold')
.get(function(req,res){
	
	if(req.session.userName!="undefined" && req.session.userName!="" && req.session.userName!=null) {
	
		res.render('postServerConfiguration',{
			loadBalancerMenuList: model.getLoadBalancerMenu(),		
			username : req.session.userName,
			requestAction : 'gzipThreshold',					
			currentVal : "GZIP enabled : "+gzipModel.getGzip()+" , current GZIP threshold : "+loadBalancerModel.getGzipThreshold(),
			gzip : gzipModel.getGzip()
		});
	
	}else{
		res.render('login',{"errorMessage" : "Please login to continue !!"});
	}
		
});


router.route('/loadbalancer/forward')
.get(function(req, res) {
	
	if(req.session.userName!="undefined" && req.session.userName!="" && req.session.userName!=null) {
	
	res.render('postServerConfiguration',{
		loadBalancerMenuList: model.getLoadBalancerMenu(),		
		username : req.session.userName,
		requestAction : 'forward',
		data : loadBalancerModel.getForward(),
		currentVal : '',
		gzip : ''
			
	});
	
	}else{
		res.render('login',{"errorMessage" : "Please login to continue !!"});
	}
	
});


router.route('/loadbalancer/latency')
.get(function(req,res){
	
	if(req.session.userName!="undefined" && req.session.userName!="" && req.session.userName!=null) {
	
		res.render('postServerConfiguration',{
			loadBalancerMenuList: model.getLoadBalancerMenu(),		
			username : req.session.userName,
			requestAction : 'latency',
			currentVal : "current latency value is :  "+loadBalancerModel.getLatency(),
			gzip : ''
		});	
	
	}else{
		res.render('login',{"errorMessage" : "Please login to continue !!"});
	}
	
});


router.route('/loadbalancer/showallservers')
.get(function(req,res){
	
	if(req.session.userName!="undefined" && req.session.userName!="" && req.session.userName!=null) {
		
		res.render('postServerConfiguration',{
			loadBalancerMenuList: model.getLoadBalancerMenu(),		
			username : req.session.userName,
			requestAction : 'show',
			currentVal : '',
			message : 'success',
			requestedData : {'nodes':loadBalancerModel.getNodes()},
			gzip : ''
		});
	
	}else{
		res.render('login',{"errorMessage" : "Please login to continue !!"});
	}
	
});

router.route('/loadbalancer/gzip/:value')
.post(function(req,res){
	gzipModel.setGzip(req.params.value);
	res.status(200).json({'message':'Gzip Enabled : '+gzipModel.getGzip()+' , current GZIP threshold : '+loadBalancerModel.getGzipThreshold(), 'flag':'Y', 'gzip':gzipModel.getGzip()});	
});


router.route('/loadbalancer/gzip/threshold/:value')
.post(function(req,res){
	if(req.params.value){
		loadBalancerModel.updateGzipThreshold(req.params.value);
		res.status(200).json({'message':'Gzip Enabled : '+gzipModel.getGzip()+' , current GZIP threshold : '+loadBalancerModel.getGzipThreshold(), 'flag':'Y'});		
	}
    else{
	   	res.status(400).json({'message':'error','description':'The action requested by url cannot be performed' , 'flag':'N'});
	   	req.on('error', function(e) {
              console.log('problem with request: ' + e.message);
	   	});

    }
});


router.route('/healthcheck')
.get(function(req, res) {
    //res.status(200).json({'message':'success','data':model.getHealthCheckConfig()});
    
	if(req.session.userName!="undefined" && req.session.userName!="" && req.session.userName!=null) {
			
			res.render('postServerConfiguration',{
				loadBalancerMenuList: model.getLoadBalancerMenu(),		
				username : req.session.userName,
				requestAction : 'healthcheck',
				currentVal : '',
				message : 'success',
				requestedData : healthcheckModel.getHealthCheckConfig(),
				gzip : ''
			});
		
		}else{
			res.render('login',{"errorMessage" : "Please login to continue !!"});
		}  
    
});


module.exports = router