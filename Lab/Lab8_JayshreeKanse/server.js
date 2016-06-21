// We first require our express package
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logData = require('./data.js');

// We create our express isntance:
var app = express();

app.use(cookieParser());
app.use(bodyParser.json()); // for parsing application/json

// Middlewares:

// 1. One which will count the number of requests made to your website

// Request is the request object, just like how we have access to the request in our routes
// Response is the response object, just like how we have access to the response in our routes
// next is a callback that will call the next middleware registered, or proceed to routes if none exist.
// If we do not call next(), we need to make sure we send a response of some sort or it will poll forever! 

// We can now navigate to localhost:3000
app.listen(3000, function() {
    console.log('Your server is now listening on port 3000! Navigate to http://localhost:3000 to access it');
});

app.use("/api", function(request, response, next) {
    logData.createLog(request.path, request.method,"Jasmine").then(function(Log) {
        response.status(200).json(Log);
	}, function(errorMessage) {
        response.status(500).json({ error: errorMessage });
    });
});

app.get("/logs", function(request, response) {
    logData.getAllLogs().then(function(Logs) {
        response.json(Logs);
    });
});

app.get("/createLog", function(request, response) {
    logData.createLog(request.path, request.method,"Rachel").then(function(Log) {
        response.json(Log);
	}, function(errorMessage) {
        response.status(500).json({ error: errorMessage });
    });
});

app.get("/cookies/addCookie/", function (request, response) {
	var lastAccessed = request.query.lastAccessed;
	var AccessedBy = request.query.AccessedBy;
	if (typeof lastAccessed === 'string' && typeof AccessedBy === 'string' && lastAccessed != "" && AccessedBy != ""){
		response.cookie(lastAccessed,AccessedBy);
		response.status(200).json({result:"This succeeded"});
		console.log(request.cookies);

	}else{
		response.status(500).json({result:"Please provide a valid input"});
	}
});


