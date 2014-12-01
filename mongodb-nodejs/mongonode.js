var MongoClient = require('mongodb').MongoClient;

//connect to the db
MongoClient.connect("mongodb://team22:japan@ds053320.mongolab.com:53320/loadbalancer",function(err,db){
	if(!err)
	 {
	  console.log("we are connected");
	  }

  var collection = db.collection('test1');
  var doc1 = {'hello':'doc1'};
  var doc2 = {'hello':'doc2'};
  var lotsOfDocs = [{'hello':'doc3'}, {'hello':'doc4'}];

// collection.insert(doc1);

  collection.insert(doc2, {w:1}, function(err, result) {});

  collection.insert(lotsOfDocs, {w:1}, function(err, result) {});
	//db.createCollection('test',{w:1}, function(err, collection) {});
});