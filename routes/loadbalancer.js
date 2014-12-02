var express = require('express'),
	router = express.Router(),
	model = require('../model/loadbalancer'),
	gzipModel = require('../model/gzip');

router.route('/nodes/:action')
	.post(function(req,res){
		var action = req.params.action;
		var address = req.body;

		if(action === "add") {
			if(!model.checkNodeExists(address)) {
				model.addNode(address);
				res.status(200).json({'message':'success'});
			} else {
				res.status(200).json({'message':'failure','description':'Node already exists in the pool'})
			}
			
		} else if(action === "delete") {
			if(model.checkNodeExists(address)) {
				model.deleteNode(address);
				res.status(200).json({'message':'success'});
			} else {
				res.status(200).json({'message':'failure','description':'Could not find the node provided. Please check the request data provided'});
			}

		} else {
			res.status(400).json({'message':'failure','description':'Sorry! Could not find the action specified in the url. Remember, you can only "add" or "delete" a node'});
		}

	});

router.route('/nodes')
	.get(function(req,res){
		res.status(200).json({'message':'success','data':{'nodes':model.getNodes()}});
	});

router.route('/gzip/threshold/:value')
	.post(function(req,res){
		if(req.params.value)
		model.updateGzipThreshold(req.params.value);

		console.log("New Threshold Value: "+ req.params.value);
		res.status(200).json({'message':'success'});
	});


router.route('/gzip/threshold')
	.get(function(req,res){
		res.status(200).json({'message':'success','data': {'threshold-val':model.getGzipThreshold()}});
	});

router.route('/gzip')
	.get(function(req,res){
		res.status(200).json({'message':'success','data': {'gzip-enabled':model.getGzip()}});
	});

router.route('/gzip/:value')
	.post(function(req,res){
			gzipModel.setGzip(req.params.value);
		console.log("Gzip value: "+ req.params.value);
		res.status(200).json({'message':'success'});
	});


router.route('/forward/:action')
.post(function(req,res){
	var address = req.body;
	var action = req.params.action;
	if(action=="set"){	
		if(address) {			
				model.updateForward(address);
				res.status(200).json({'message':'success'});			
			
		} else {
			res.status(400).json({'message':'success'},{'description':'Sorry! Could not process the request. Please check the request data'});
		}
	
	}else if(action=="remove"){
		
		if(address){	
			model.deleteForward();
			res.status(200).json({'message':'success'});			
		} else {
			res.status(400).json({'message':'success'},{'description':'Sorry! Could not process the request. Please check the request data'});		
		}
		
	}else {
		res.status(400).json({'message':'failure','description':'Sorry! Could not find the action specified in the url. Remember, you can only "set" or "remove" forwarding server'});
	}
		
});

router.route('/forward')
.get(function(req, res) {
	res.status(200).json({'message':'success','data':model.getForward()});
});


router.route('/latency/:value')
.post(function(req,res){
	if(req.params.value) {
		model.updateLatency(req.params.value);
		res.status(200).json({'message':'success'});
	} else {
		res.status(400).json({'message':'success'},{'description':'Sorry! Could not process the request. Please check the request data'});
	}
});

router.route('/latency')
.get(function(req,res){
	res.status(200).json({'message':'success','data':{'latency-val':model.getLatency()}});
});



module.exports = router