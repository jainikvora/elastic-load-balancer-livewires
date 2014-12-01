var MongoClient = require('mongodb').MongoClient;

//connect to the db
MongoClient.connect("mongodb://team22:japan@ds053320.mongolab.com:53320/loadbalancer",function(err,db){
	if(err)
	 {
	  return console.dir(err);
	  }

  var collection = db.collection('test1');

    collection.remove({'hello':'doc3'}, {w:1}, function(err, result) {});

	//db.createCollection('test',{w:1}, function(err, collection) {});
});