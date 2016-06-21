// We first require our express package
var express = require('express');
var bodyParser = require('body-parser');
var myData = require('./toDoEntries.js');

// This package exports the function to create an express instance:
var app = express();

// We can setup Jade now!
app.set('view engine', 'ejs');

// This is called 'adding middleware', or things that will help parse your request
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// it will check the 'static' folder for matching files 
app.use('/assets', express.static('static'));

// Setup your routes here!

app.get("/home", function (request, response) {
    response.render("pages/home", { pageTitle: "Welcome Home" });
});

app.get("/", function (request, response) { 
    // We have to pass a second parameter to specify the root directory
    // __dirname is a global variable representing the file directory you are currently in
    response.sendFile("./pages/index.html", { root: __dirname });
});

app.get("/api/todo", function (request,response){
	var AllTasks = myData.AllTasksInToDo();
	response.json(AllTasks);
});

app.get("/api/todo/open", function (request,response){
	var TaskStatus = "open";
	var TaskOpen = myData.TaskBasedOnStatus(TaskStatus);
	response.json(TaskOpen);
});

app.get("/api/todo/completed", function (request,response){
	var TaskStatus = "completed";
	var TaskCompleted = myData.TaskBasedOnStatus(TaskStatus);
	response.json(TaskCompleted);
});

app.get("/api/todo/:id", function (request,response)
{	
	var id = request.params.id;
	try{
		var ReturnedTasks = myData.DisplayTask(id);
		response.json(ReturnedTasks);
	}catch(e){
		response.status(e.code).json(e.error);
	}
});

app.put("/api/todo/:id", function(request,response)
{	
	var taskTitle = request.body.taskTitle;
	var taskDescription = request.body.taskDescription;
	var taskStatus = request.body.taskStatus;
		
	try{
	var UpdatedTask = myData.UpdateTask(request.params.id,taskTitle,taskDescription,taskStatus);
	response.json(UpdatedTask);
	}catch(e){
		response.status(e.code).json(e.error);
	}
});

app.post("/api/todo/:id/notes", function(request,response)
{	
	var taskNotes = request.body.taskNotes;
	var ResultNotes = taskNotes.split(","); 
		
	try{
		var taskResult = myData.UpdateTaskNotes(request.params.id, ResultNotes);
		response.json(taskResult);
	}catch(e){
		response.status(e.code).json(e.error);
	}
});

app.delete("/api/todo/:id", function(request,response)
{	
	try{
		var Deletetask = myData.DeleteTask(request.params.id);
		response.json({success:"true"});
	}catch(e){
		response.status(e.code).json(e.error);
	}
});

app.post("/api/todo", function (request, response)
{	
	var taskAuthor = request.body.taskAuthor;
	var TaskTitle = request.body.taskTitle;
	var TaskDescription = request.body.taskDescription;
		
	var toDoListTask = {
		id: 0,
		author: taskAuthor,
		taskTitle: TaskTitle,
		taskDescription: TaskDescription,
		taskNotes: "",
		taskStatus: "open"
	}
	
	try{
	
	var addedTask = myData.addTask(toDoListTask);
	response.json(addedTask);
	}catch(e){
		response.status(e.code).json(e.error);
	}
});

// We can now navigate to localhost:3000
app.listen(3000, function () {
    console.log('Your server is now listening on port 3000! Navigate to http://localhost:3000 to access it');
});
