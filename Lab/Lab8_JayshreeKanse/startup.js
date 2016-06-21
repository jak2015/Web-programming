var MongoClient = require('mongodb').MongoClient,
    settings = require('./config.js'),
    Guid = require('Guid');

var fullMongoUrl = settings.mongoConfig.serverUrl + settings.mongoConfig.database;

function runSetup() {
    return MongoClient.connect(fullMongoUrl)
		.then(function(db){
			return db.createCollection("logs");
		}).then(function(LogEntries) {

            return LogEntries.count().then(function(theCount) {
                // the result of find() is a cursor to MongoDB, and we can call toArray() on it
                if (theCount > 0) {
                    return LogEntries.find.toArray();
                }
				
				var now = new Date();
                return LogEntries.insertOne({ _id: Guid.create().toString(), 
											  requestId: Guid.create().toString(), 
											  requestPath: "/api", 
											  requestMethod: "get" , 
											  cookies:{
												  lastAccessTime: now.getTime().toString(),
												  Accessedby: "Jayshree Kanse"
											  }, 
											  timestamp: now.toString()}).then(function(newDoc) {
                    return newDoc;
                }).then(function() {
                    return LogEntries.insertOne({ _id: Guid.create().toString(), 
												  requestId: Guid.create().toString(), 
												  requestPath: "/api", 
												  requestMethod: "get" , 
												  cookies:{
													  lastAccessTime: now.getTime().toString(),
													  Accessedby: "John Smith"
												  }, 
												  timestamp: now.toString()});
                }).then(function() {
                    return LogEntries.insertOne({ _id: Guid.create().toString(), 
												  requestId: Guid.create().toString(), 
												  requestPath: "/api", 
												  requestMethod: "get" , 
												  cookies:{
													  lastAccessTime: now.getTime().toString(),
													  Accessedby: "Chandler Bing"
												  }, 
												  timestamp: now.toString()});
                }).then(function() {
                    return LogEntries.find().toArray();
                });
            });
        });
}

// By exporting a function, we can run 
var exports = module.exports = runSetup;