var db = require('../util/mongodbUtil');

var operations = {
	//add the server to the database
	addNode : function(address) {
		var collection = db.getDB().collection('dbload'); // get the collection from the loadbalancer database
		collection.update({'ID':'dbconfig'}, {$push:{'address':address}}, {w:1}, function(err, result) {});
		console.log("added the address to mongodb");
	},
	//delete address of server from the database
	deleteNode : function(address) {
		var collection = db.getDB().collection('dbload');
		collection.update({'ID':'dbconfig'},{$pull:{'address':{'host':address.host,'port':address.port}}},{w:1},function(err,result){});
		console.log("deleted successfully");
		
	},
	// set the threshold value in the database
	updateGzipThreshold : function(value) {
		var collection = db.getDB().collection('dbload');
		collection.update({'ID':'dbconfig'}, {$set:{'gzipthreshold':value}}, {w:1}, function(err, result) {});
		console.log("deleted successfully");
	},
	//set the value of gzip
	setGzip : function(value) {
		var collection = db.getDB().collection('dbload');
		collection.update({'ID':'dbconfig'}, {$set:{'gzip':value}}, {w:1}, function(err, result) {});
		console.log("update setGzip successfully");
	},

	//update the value of latency
	updateLatency : function(value) {
		var collection = db.getDB().collection('dbload');
		collection.update({'ID':'dbconfig'}, {$set:{'latency':value}}, {w:1}, function(err, result) {});
		console.log("update the latency successfully");
	},
// update the forward server address
	updateForward : function(address) {
		var collection = db.getDB().collection('dbload');
		collection.update({'proxyConfig.forward':{$exists:true}}, {'$set':{'proxyConfig.forward':address}},{w:1}, function(err, result) {});
		console.log("updated forward successfully");
	},
//delete forward address server
	deleteForward : function(address) {
		var collection = db.getDB().collection('dbload');
		collection.update({'ID':'dbconfig'},{$pull:{'forward':{'host':address.host,'port':address.port}}},{w:1},function(err,result){});
			console.log("deleted forward server successfully");
	}
}
module.exports = operations;