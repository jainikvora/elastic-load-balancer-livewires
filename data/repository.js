function AddressRepo() {
	this.addresses = [];

	this.gzipThreshold = 0;

	this.gzip = "true";

	this.proxyConfig = [];

	this.latency = 0;

    this.healthCheckConfig = {};

    this.healthCheckInfo = [];
}

module.exports = new AddressRepo();