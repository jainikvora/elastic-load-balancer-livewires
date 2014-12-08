var MongoClient = require('mongodb').MongoClient
	, repository = require('../data/repository')
	, dbConn = null;

var loadRepository = function () {
	getDB().collection('dbload').findOne({'ID':'dbconfig'}, function(err,data) {
		for(key in data) {
			switch(key) {
				case "addresses": {
					repository.healthCheckInfo = data[key];
					console.log(repository.healthCheckInfo);
					break;
				}
				case "gzipthreshold": {
					repository.gzipThreshold = data[key];
					break;
				}
				case "gzip": {
					repository.gzip = data[key];
					break;
				}
				case "latency": {
					repository.latency = data[key];
					break;
				}
				case "forward": {
					repository.proxyConfig.forward = data[key];
					break;
				}
				case "healthCheckConfig": {
					repository.healthCheckConfig = data[key];
				}
			}
		}
	});
};

var createConnection = function() {
	MongoClient.connect("mongodb://team22:japan@ds053320.mongolab.com:53320/loadbalancer",function(err, db){
		if(!err) {
			console.log("we are connected");
			dbConn = db;
			loadRepository()
		}
		else {
			logger.debug("Error occured while connecting to mongodb: "+ err.message())
		}
	})
};

var getDB = function() {
	return dbConn;
};

var DBUtil =
{
	loadRepository : loadRepository,
	createConnection : createConnection,
	getDB : getDB
};

module.exports = DBUtil;