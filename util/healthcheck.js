/**
 * Created by Jvalant on 12/2/2014.
 */
var http = require('http'),
    healthCheckModel = require('../model/healthcheckmodel'),
    loadBalancerModel = require('../model/loadbalancer');

function pingUtility() {
    function loop(){
        healthCheckModel.getHealthCheckInfo().forEach(function (host) {
            var target ={
                host : host.host,
                port : host.port,
                path : healthCheckModel.getCheckUrl()
            };
            //requestUrl =target.host+":"+target.port+healthCheckModel.getCheckUrl();
            var req = http.get(target, function(res) {
                //console.log( "Target :"+host.host +""+host.port+" "+'STATUS: ' + res.statusCode);

                if(res.statusCode==200){
                    if(host.healthyCount <= healthCheckModel.getHealthyCount()){
                        host.healthyCount++;
                        host.unhealthyCount = 0;

                    }
                    else{
                        if(!loadBalancerModel.checkNodeExists(target))
                        {
                            host.unhealthyCount =0;
                            var targetNew ={
                                host : target.host,
                                port : target.port
                            };
                            loadBalancerModel.addNode(targetNew);
                        }
                    }
                }

            });
            req.on('error', function(e) {
                //console.log('ERROR: for '+host.host +""+host.port + e.message);

                if(host.unhealthyCount<healthCheckModel.getUnHealthyCount()){
                    host.unhealthyCount++;
                }
                else{
                    if(loadBalancerModel.checkNodeExists(target)){
                        loadBalancerModel.deleteNode(target);
                        host.healthyCount =0;
                    }
                }
            });
        });
        //console.log("Working servers added by load balancer:")
        //console.log(loadBalancerModel.getNodes());
        //console.log("Server status in healthcheck:")
        //console.log(healthCheckModel.getHealthCheckInfo());
        setTimeout(function () {
            process.nextTick(function () {
                loop();
            });
        }, healthCheckModel.getCheckInterval());
    }
    loop();
}
module.exports = new pingUtility();
