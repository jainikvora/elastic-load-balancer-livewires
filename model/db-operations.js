var db = require('../util/mongodbUtil');

var operations = {
	//add the server to the database
	addNode : function(address) {
		var collection = db.getDB().collection('dbload');
		collection.update({'ID':'dbconfig'}, {$push:{'addresses':address}}, {w:1}, function(err, result) {
			if(!err)
			console.log("node added in database successfully");
			else
			console.log("error occured while adding address to database: " + err.message());
		})
	},

	//delete address of server from the database
	deleteNode : function(address) {
		var collection = db.getDB().collection('dbload');
		collection.update({'ID':'dbconfig'},{$pull:{'addresses':{'host':address.host,'port':address.port}}},{w:1},function(err,result){
			if(!err)
				console.log("node deleted successfully from database");
			else
				console.log("error occured while deleting node to database: " + err.message());
		});
	},

	// set the threshold value in the database
	updateGzipThreshold : function(value) {
		var collection = db.getDB().collection('dbload');
		collection.update({'ID':'dbconfig'}, {$set:{'gzipthreshold':value}}, {w:1}, function(err, result) {
			if(!err)
				console.log("gzip threshold updated successfully from database");
			else
				console.log("error occured while updating gzip threshold to database: " + err.message());
		});
	},

	//set the value of gzip
	setGzip : function(value) {
		var collection = db.getDB().collection('dbload');
		collection.update({'ID':'dbconfig'}, {$set:{'gzip':value}}, {w:1}, function(err, result) {
			if(!err)
				console.log("gzip updated successfully from database");
			else
				console.log("error occured while updating gzip to database: " + err.message());
		});
	},

	//update the value of latency
	updateLatency : function(value) {
		var collection = db.getDB().collection('dbload');
		collection.update({'ID':'dbconfig'}, {$set:{'latency':value}}, {w:1}, function(err, result) {
			if(!err)
				console.log("latency updated successfully from database");
			else
				console.log("error occured while updating latency to database: " + err.message());
		});
	},

	// update the forward server address
	updateForward : function(address) {
		var collection = db.getDB().collection('dbload');
		collection.update({'ID':'dbconfig'}, {'$set':{'forward':address}},{w:1}, function(err, result) {
			if(!err)
				console.log("forward node updated successfully from database");
			else
				console.log("error occured while updating forward node to database: " + err.message());
		});
	},

	//delete forward address server
	deleteForward : function(address) {
		var collection = db.getDB().collection('dbload');
		collection.update({'ID':'dbconfig'},{'$unset':{'forward':""}},{w:1},function(err,result){
			if(!err)
				console.log("forward node deleted successfully from database");
			else
				console.log("error occured while deleting forward node to database: " + err.message());
		});
	}
};
module.exports = operations;