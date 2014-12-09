var db = require('../util/mongodbUtil');

var operations = {
	//add the server to the database
	addNode : function(node) {
		var collection = db.getDB().collection('dbload');
		collection.update({'ID':'dbconfig'}, {$push:{'addresses':node}}, {w:1}, function(err, result) {
			if(!err)
			{
			console.log("node added  successfully");
		    }
			else
			{
			console.log("error encountered while adding address to database: " + err.message());
		    }
		})
	},

	//delete address of server from the database
	deleteNode : function(address) {
		var collection = db.getDB().collection('dbload');
		collection.update({'ID':'dbconfig'},{$pull:{'addresses':{'host':address.host,'port': parseInt(address.port)}}},{w:1},function(err,result){
			if(!err)
			{
				console.log("node deleted successfully ");
			}
			else
			{
				console.log("error encountered while deleting node to database: " + err.message());
			}
		});
	},

	// set the threshold value in the database
	updateGzipThreshold : function(value) {
		var collection = db.getDB().collection('dbload');
		collection.update({'ID':'dbconfig'}, {$set:{'gzipthreshold':value}}, {w:1}, function(err, result) {
			if(!err)
			{
				console.log("gzip threshold updated successfully ");
			}
			else
			{
				console.log("error encountered while updating gzip threshold to database: " + err.message());
			}
		});
	},

	//set the value of gzip
	setGzip : function(value) {
		var collection = db.getDB().collection('dbload');
		collection.update({'ID':'dbconfig'}, {$set:{'gzip':value}}, {w:1}, function(err, result) {
			if(!err)
			{
				console.log("gzip updated successfully ");
			}
			else
			{
				console.log("error encountered while updating gzip to database: " + err.message());
			}
		});
	},

	//update the value of latency
	updateLatency : function(value) {
		var collection = db.getDB().collection('dbload');
		collection.update({'ID':'dbconfig'}, {$set:{'latency':value}}, {w:1}, function(err, result) {
			if(!err)
			{
				console.log("latency updated successfully ");
			}
			else
			{
				console.log("error encountered while updating latency to database: " + err.message());
			}
		});
	},

	// update the forward server address
	updateForward : function(address) {
		var collection = db.getDB().collection('dbload');
		collection.update({'ID':'dbconfig'}, {'$set':{'forward':address}},{w:1}, function(err, result) {
			if(!err)
			{
				console.log("forward node updated successfully ");
			}
			else
			{
				console.log("error encountered while updating forward node to database: " + err.message());
			}
		});
	},

	//delete forward address server
	deleteForward : function(address) {
		var collection = db.getDB().collection('dbload');
		collection.update({'ID':'dbconfig'},{'$unset':{'forward':""}},{w:1},function(err,result){
			if(!err)
			{
				console.log("forward node deleted successfully ");
			}
			else
			{
				console.log("error encountered while deleting forward node to database: " + err.message());
			}
		});
	},

	updateHealthCheckConfig : function(config) {
		var collection = db.getDB().collection('dbload');

		collection.update({'ID':'dbconfig'},{'$set':{'healthCheckConfig':config}},{w:1},function(err,result){
			if(!err)
			{
				console.log("healthcheck config updated successfully ");
			}
			else
			{
				console.log("error encountered while updating healthcheck config to database: " + err.message());
			}
		});
	}
};
module.exports = operations;