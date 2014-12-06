function AddressRepo() {
	this.addresses = [];

	this.gzipThreshold = 0;

	this.gzip = "true";

	this.proxyConfig = [];

	this.latency = 0;

    this.healthCkeckConfig ={
        checkUrl:"/",
        timeout : 5000,
        checkInterval : 10000,
        healthyCount : 3,
        unhealthyCount : 3
    }

    this.healthCheckInfo = [
        /*{
         host: '127.0.0.1',
         port: 8085,
         healthyCount :0,
         unhealthyCount:0,
         }*/
    ];
}

module.exports = new AddressRepo();