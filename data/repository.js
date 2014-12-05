function AddressRepo() {
	this.addresses = [];

	this.gzipThreshold = 0;

	this.gzip = "true";

	this.proxyConfig = [];

	this.latency = 0;
}

module.exports = new AddressRepo();