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

    ];
}

module.exports = new AddressRepo();