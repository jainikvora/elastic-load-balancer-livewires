var MongoClient = require('mongodb').MongoClient;

var dbConn = null;


//connect to the db
var DBUtil = 
{
	createConnection : function() {
		MongoClient.connect("mongodb://team22:japan@ds053320.mongolab.com:53320/loadbalancer",function(err,db){
		if(!err)
		 {
		  console.log("we are connected");

		  dbConn = db;
		  }
		})
	},

	getDB : function() {
		return dbConn;
	}
}
module.exports = DBUtil;