// We first require our express package
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var userData = require('./data.js');
var bcrypt = require("bcrypt-nodejs");
var Guid = require("Guid");

// We create our express isntance:
var app = express();

// We can setup Jade now!
app.set('view engine', 'ejs');

app.use('/assets', express.static('static'));

app.use(cookieParser());

// This is called 'adding middleware', or things that will help parse your request
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

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

app.get("/", function (request, response) 
{
	if(!request.cookies.currentSessionId){
		response.render("pages/forms", { pageTitle: "Welcome Home" });
	}else{
		response.redirect('/profile');
	}
});

app.use(function(request, response, next){
	if(!request.cookies.currentSessionId){
		
		var expiresAt = new Date();
    	expiresAt.setMinutes(expiresAt.getMinutes()+2);
    	var session = Guid.create().toString();
		response.cookie("currentSessionId", session, {expires: expiresAt});
	}
	next();
});

app.post("/signin", function(request, response) {
	var UserName = request.body.Username;
	var Password = request.body.Passwrd;

	console.log(UserName+" "+Password);
    userData.checkUser(UserName,Password).then(function(newUser) {
	
	if(!newUser) console.log("user is undefined");
	
	bcrypt.compare(Password, newUser.encryptedPassword, function(err, res){
        	if (res === true) {
            	
            	var expiresAt = new Date();
    			expiresAt.setMinutes(expiresAt.getMinutes()+2);
				response.cookie("currentSessionId", newUser.currentSessionId, {expires: expiresAt});
				response.locals.userSession = request.cookies.currentSessionId;
				console.log("In chek user function" +request.cookies.currentSessionId);
				response.redirect('/profile');
            	
            } else {
                response.json({error : "Password does not match."});
            }
        });	

    }, function(errorMessage) {
        response.status(500).json({ error: errorMessage });
    });
});

app.get("/profile", function(request, response){
	userData.getUserBySessionId(request.cookies.currentSessionId).then(function(user){

		response.locals.userSession = request.cookies.currentSessionId;
		response.render("pages/profile", { pageTitle: "User Profile" });
	}, function(errorMessage){
        response.status(500).json({ error: errorMessage });
	});
});

app.post("/profile", function(request, response){
	userData.getUserBySessionId(request.cookies.currentSessionId).then(function(user){
		userData.updateUserProfile(user._id, request.body.FirstName, request.body.LastName, request.body.Hobby, request.body.PetName).then(function(updatedUser){

			response.locals.userSession = request.cookies.currentSessionId;
			response.render("pages/displayProfile", {'FirstName':request.body.FirstName, 'LastName':request.body.LastName,'Hobby':request.body.Hobby,'PetName':request.body.PetName})			
		}, function(errorMessage){
			response.status(500).json({ error: errorMessage });
		});
	});
});

app.post("/signup", function(request, response){
	var UserName = request.body.uname;
	var Password = request.body.pwd;
	console.log("in signup" +request.cookies.currentSessionId);
	userData.usernameExists(UserName).then(function()
	{
		userData.createUser(UserName, Password, request.cookies.currentSessionId).then(function(user){
			response.redirect('/profile');
		}, function(errorMessage){
			response.status(500).json({ error: errorMessage });
		});
	});
});

app.all("/logout", function(request, response){
	    
    var expiresAt = new Date();
    expiresAt.setHours(expiresAt.getMinutes() -5);
    response.cookie("currentSessionId", "", { expires: expiresAt });
    response.clearCookie("currentSessionId");

    response.locals.userSession = undefined;
	response.redirect('/');
});


