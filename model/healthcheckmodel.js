/**
 * Created by Jvalant on 11/26/2014.
 */
var repository = require('../data/repository')
    , commonUtil = require('../util/common')
    , dbOperations = require('../model/db-operations');

var model =  {

    setTimeOut: function(timeOut) {
        repository.healthCheckConfig.timeout = timeOut;
    },

    setCheckInterval: function(checkInterval) {
        repository.healthCheckConfig.checkInterval = checkInterval;
    },

    setHealthyCount: function(healthyCount) {
        repository.healthCheckConfig.healthyCount = healthyCount;
    },
    setUnHealthyCount: function(unhealthyCount) {
        repository.healthCheckConfig.unhealthyCount = unhealthyCount;
    },

    setCheckUrl: function(checkUrl) {
        repository.healthCheckConfig.checkUrl = checkUrl;
    },

    setHealthCheckConfig: function(config) {
        if(!commonUtil.isEmpty(config.checkUrl)) repository.healthCheckConfig.checkUrl = config.checkUrl;
        if(!commonUtil.isEmpty(config.timeout)) repository.healthCheckConfig.timeout = config.timeout;
        if(!commonUtil.isEmpty(config.checkInterval)) repository.healthCheckConfig.checkInterval = config.checkInterval;
        if(!commonUtil.isEmpty(config.healthyCount)) repository.healthCheckConfig.healthyCount = config.healthyCount;
        if(!commonUtil.isEmpty(config.unhealthyCount)) repository.healthCheckConfig.unhealthyCount = config.unhealthyCount;

        dbOperations.updateHealthCheckConfig(config);
    },

    getCheckUrl: function() {
        return repository.healthCheckConfig.checkUrl;
    },

    getTimeOut: function() {
        return repository.healthCheckConfig.timeout;
    },

    getCheckInterval: function() {
        return repository.healthCheckConfig.checkInterval;
    },

    getHealthyCount: function() {
        return repository.healthCheckConfig.healthyCount;
    },

    getUnHealthyCount: function() {
        return repository.healthCheckConfig.unhealthyCount;
    },

    getHealthCheckConfig: function(){
        return repository.healthCheckConfig;
    },

    addNodeForHealthCheck: function(address) {
        var newCheck = {
            host : address.host,
            port : address.port,
            healthyCount : 0,
            unhealthyCount : 0
        };
        repository.healthCheckInfo.push(newCheck);
        console.log(newCheck);
        dbOperations.addNode(newCheck);
    },

    deleteNodeForHealthCheck: function(address) {
        repository.healthCheckInfo.forEach(function(obj) {
            if(obj.host == address.host && obj.port == address.port) {
                repository.healthCheckInfo.splice(repository.healthCheckInfo.indexOf(obj), 1);
            }
        });
        dbOperations.deleteNode(address);
    },

    getHealthCheckInfo: function(){
        return repository.healthCheckInfo;
    },

    checkNodeExistsForHC: function(address) {
        var found = false;
        repository.healthCheckInfo.forEach(function(obj) {
            if(obj.host == address.host && obj.port == address.port) {
                found = true;
            }
        });
        return found;
    }
}

module.exports = model;
