var MongoClient = require('mongodb').MongoClient,
    settings = require('./config.js'),
    Guid = require('Guid');
var bcrypt = require("bcrypt-nodejs");


var fullMongoUrl = settings.mongoConfig.serverUrl + settings.mongoConfig.database;
var exports = module.exports = {};
	
MongoClient.connect(fullMongoUrl)
    .then(function(db) {
        var userCollection = db.collection("UserProfile");

exports.checkUser = function(UserName,Password) {
	if (UserName == "" || Password == "")  return Promise.reject("You must enter all the fields.");
		return userCollection.find({ Username: UserName }).limit(1).toArray().then(function(User) {
			if(User.length === 0) {
                    return Promise.reject('could not find user with the username of '+UserName);
                }
            return User[0];
		});
	}
	
exports.getUserById = function(userId){
    if(!userId) return Promise.reject('Missing user Id');

        return userCollection.find({'_id':userId}).limit(1).toArray().then(function(usersLists){
        if(usersLists.length === 0) throw "Can not find user with id of "+userId;
            return usersLists[0];
		})
    };	
	
exports.getUserBySessionId = function(sessionId) {
    if (!sessionId) return Promise.reject("You must provide an ID");

		return userCollection.find({ 'currentSessionId': sessionId}).limit(1).toArray().then(function(listOfUsers) {
        if (listOfUsers.length === 0) throw "Could not find user with sessionId of " + sessionId;
            return listOfUsers[0];
        });
    };	

exports.updateUserProfile = function(id, firstName, lastName, hobby, petName){
    if(!id) return Promise.reject("Must provide user Id");
    if(!firstName) return Promise.reject("Must provide first name");
    if(!lastName) return Promise.reject("Must provide last name");
    if(!hobby) return Promise.reject("Must provide hobby");
    if(!petName) return Promise.reject("Must provide pet name");

        return userCollection.updateOne({'_id': id}, { $set: {'Profile': {'FirstName': firstName, 'LastName': lastName, 'Hobby': hobby, 'PetName': petName}}}).then(function(){
			return exports.getUserById(id);
        });
    };	
	
exports.createUser = function(UserName,Password, sessionId) {
    if (UserName == "")  return Promise.reject("You must provide a User name.");
    if (Password == "") return Promise.reject("You must provide a password.");
	if(!sessionId) return Promise.reject("sessionId is blank.");
	var hashPassword = bcrypt.hashSync(Password);
	
	return userCollection.insertOne({'_id':Guid.create().toString(), 'Username': UserName, 'encryptedPassword': hashPassword, 'currentSessionId': sessionId, 'Profile':{}}).then(function(insertedUser){
                
        return insertedUser.insertedId;
    }).then(function(newUserId){
            return exports.getUserById(newUserId);
        });
	}
	
exports.usernameExists = function(uname){
    if(!uname) return Promise.reject("Must provide username.");
            
        return userCollection.find({'Username': uname}).limit(1).toArray().then(function(userList){
            if(userList.length === 0) return true;
                else return Promise.reject("Username already taken.");
        });
    };
});

