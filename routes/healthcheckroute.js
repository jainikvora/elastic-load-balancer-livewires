/**
 * Created by Jvalant on 11/28/2014.
 */

var express = require('express'),
    router = express.Router(),
    model = require('../model/healthcheckmodel');


router.route('/')
    .post(function(req,res){
        var healthCheckConfig = req.body;
        if(healthCheckConfig) {
            model.setHealthCheckConfig(healthCheckConfig);
            res.status(200).json({'message':'health check configuration updated successfully !!'});
        } else {
            res.status(400).json({'message':'Failed'},{'description':'Sorry! Could not process the request. Please check the request data'});
        }
    })
    .get(function(req, res) {


        res.status(200).json({'message':'success','data':model.getHealthCheckConfig()});
    });

module.exports = router;
