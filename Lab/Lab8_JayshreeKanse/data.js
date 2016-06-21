var MongoClient = require('mongodb').MongoClient,
    runStartup = require("./startup.js"),
    settings = require('./config.js'),
    Guid = require('Guid');

var fullMongoUrl = settings.mongoConfig.serverUrl + settings.mongoConfig.database;
var exports = module.exports = {};

runStartup().then(function(Logs) {
    console.log("Database has been created successfully");
});

MongoClient.connect(fullMongoUrl)
	.then(function(db){
		var AllLogs = db.collection("logs");

		exports.getAllLogs = function(){
			return AllLogs.find().toArray();
		}
		
		exports.getLog = function(id) {
            if (!id) return Promise.reject("You must provide an ID");
		
            return AllLogs.find({ _id: id }).limit(1).toArray().then(function(listOflogs) {
                if (listOflogs.length === 0) throw "Could not find movie with id of " + id;

                return listOflogs[0];
            });
        };
		
		exports.createLog = function(reqpath,reqmethod,accessedBy){
			if (reqpath == "" || reqmethod == "" || accessedBy == "") return Promise.reject("Invalid data");
			
			var now = new Date();
			return AllLogs.insertOne({ _id: Guid.create().toString(), 
										  requestId: Guid.create().toString(), 
										  requestPath: reqpath,  
										  requestMethod: reqmethod,
										  cookies:{
												  lastAccessTime: now.getTime().toString(),
												  Accessedby: accessedBy
											  }, 
										  timestamp: now.toString()}).then(function(newDoc) {
                return newDoc.insertedId;
				console.log(insertedId);
				}).then(function(newId) {
                return exports.getLog(newId);
            });
		}
	});



