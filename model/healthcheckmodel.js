/**
 * Created by Jvalant on 11/26/2014.
 */
repository = require('../data/repository'),
commonUtil = require('../util/common');
var model =  {

    setTimeOut: function(timeOut) {
        repository.healthCkeckConfig.timeout = timeOut;
    },

    setCheckInterval: function(checkInterval) {
        repository.healthCkeckConfig.checkInterval = checkInterval;
    },

    setHealthyCount: function(healthyCount) {
        repository.healthCkeckConfig.healthyCount = healthyCount;
    },
    setUnHealthyCount: function(unhealthyCount) {
        repository.healthCkeckConfig.unhealthyCount = unhealthyCount;
    },

    setCheckUrl: function(checkUrl) {
        repository.healthCkeckConfig.checkUrl = checkUrl;
    },

    setHealthCheckConfig: function(config) {
        if(!commonUtil.isEmpty(config.checkUrl)) repository.healthCkeckConfig.checkUrl = config.checkUrl;
        if(!commonUtil.isEmpty(config.timeout)) repository.healthCkeckConfig.timeout = config.timeout;
        if(!commonUtil.isEmpty(config.checkInterval)) repository.healthCkeckConfig.checkInterval = config.checkInterval;
        if(!commonUtil.isEmpty(config.healthyCount)) repository.healthCkeckConfig.healthyCount = config.healthyCount;
        if(!commonUtil.isEmpty(config.unhealthyCount)) repository.healthCkeckConfig.unhealthyCount = config.unhealthyCount;
    },

    getCheckUrl: function() {
        return repository.healthCkeckConfig.checkUrl;
    },

    getTimeOut: function() {
        return repository.healthCkeckConfig.timeout;
    },

    getCheckInterval: function() {
        return repository.healthCkeckConfig.checkInterval;
    },

    getHealthyCount: function() {
        return repository.healthCkeckConfig.healthyCount;
    },

    getUnHealthyCount: function() {
        return repository.healthCkeckConfig.unhealthyCount;
    },

    getHealthCheckConfig: function(){
        return repository.healthCkeckConfig;
    },

    addNodeForHealthCheck: function(address) {
        var newCheck = {
            host : address.host,
            port : address.port,
            healthyCount : 0,
            unhealthyCount : 0
        }
        repository.healthCheckInfo.push(newCheck);
    },

    deleteNodeForHealthCheck: function(address) {
        repository.healthCheckInfo.forEach(function(obj) {
            if(obj.host == address.host && obj.port == address.port) {
                repository.healthCheckInfo.splice(repository.healthCheckInfo.indexOf(obj));
            }
        })
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
        })
        return found;
    }
}

module.exports = model;
