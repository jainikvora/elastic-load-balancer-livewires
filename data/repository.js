function AddressRepo() {
	this.addresses = [
	{
		host: 'localhost',
		port: 8000
	}			
	];

	this.gzipThreshold = 0;

	this.proxyConfig = [];

	this.latency = 0;
}

module.exports = new AddressRepo();