var express = require('express'),
	router = express.Router(),
	model = require('../model/proxy');

router.route('/target')
	.post(function(req,res){
		var address = req.body;
		if(address) {
			model.updateTarget(address);
			res.status(200).json({'message':'success'});
		} else {
			res.status(400).json({'message':'success'},{'description':'Sorry! Could not process the request. Please check the request data'});
		}
	})
	.get(function(req, res) {
		res.status(200).json({'message':'success','data':model.getTarget()});
	});

router.route('/forward')
	.post(function(req,res){
		var address = req.body;
		if(address) {
			model.updateForward(address);
			res.status(200).json({'message':'success'});
		} else {
			res.status(400).json({'message':'success'},{'description':'Sorry! Could not process the request. Please check the request data'});
		}
	})
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