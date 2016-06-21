var exports = module.exports = {};

var ToDoEntry = [];

exports.AllTasksInToDo = function () { 
    return ToDoEntry;
}

exports.addTask = function (AddTask) 
{	
	if(AddTask.author == ""|| AddTask.taskTitle == "" || AddTask.taskDescription == "")
		throw {code:500, error:"You must provide valid information in the request body to create an entry."};
	
    AddTask.id = ToDoEntry.length;
    ToDoEntry.push(AddTask);
    return AddTask;
}

exports.TaskBasedOnStatus = function (TaskStatus)
{	
	var TaskWithStatus = ToDoEntry.filter(function (todoTask) { return todoTask.taskStatus === TaskStatus; });
	
	if (TaskWithStatus.length > 0) return TaskWithStatus;
    
	throw {code:404,error:"Task with " + TaskStatus + " status could not be found."};
}

exports.DisplayTask = function (id)
{	
	if (typeof id === "string") id = parseInt(id);
	if (id !== 0 && !id) throw "Must provide ID";
	var todoTask = ToDoEntry.filter(function (todoTask) {
        return todoTask.id === id;
    }).shift();
	if (!todoTask) throw {code:404,error:"An entry with the ID of "+id+" could not be found"};
	return todoTask;	
}

exports.UpdateTask = function(id,taskTitle,taskDescription,taskStatus)
{	
	if(taskTitle == "" && taskDescription == "" && taskStatus == "")
		throw {code:500, error:"You must provide valid information in the request body to create an entry."};
	
	var GetTask = exports.DisplayTask(id);
	
	if(taskTitle != "")
		GetTask.taskTitle = taskTitle;
	
	if(taskDescription != "")
		GetTask.taskDescription = taskDescription;
	
	if(taskStatus != "")
		if(taskStatus == "open" || taskStatus == "completed")
		{
			GetTask.taskStatus = taskStatus;	}
		else{
			throw {code:500, error:"You must provide valid information in the request body to create an entry."};
		}
	return GetTask;
}

exports.UpdateTaskNotes = function(id, taskNotes)
{	
	if(taskNotes == "")
		throw {code:500, error:"You must provide valid information in the request body to create an entry."};
	
	var GetTask = exports.DisplayTask(id);
	console.log(GetTask);
	GetTask.taskNotes = taskNotes;
	return GetTask;	
}

exports.DeleteTask = function(id)
{	
	if(id == "") throw {code:500, error:"You must provide valid information in the request body to create an entry."};
	var GetTask = exports.DisplayTask(id);
	var index = ToDoEntry.indexOf(GetTask);
	if(index > -1)
		ToDoEntry.splice(index, 1);
	else
		throw {code:404,error:"An entry with the ID of "+id+" could not be found"};
}

exports.addTask({ id:0, 
				  author: "Phil Barresi", 
				  taskTitle: "Buy More Coffee", 
				  taskDescription: "The current batch of Yirgacheffe is stale; buy an updated batch so that the afternoon coffee is up to standard.", 
				  taskNotes:["Whole Foods doesn't roast in store; don't go there", "Toby's is out!", "Turns out Yirgacheffe is out of season, going to look for Central American Blends"],
				  taskStatus:"completed" });
				  
exports.addTask({ id:0, 
				  author: "Jayshree", 
				  taskTitle: "Meet a friend", 
				  taskDescription: "Meeting with John Smith, Place: MCD, Time:6PM", 
				  taskNotes:"", taskStatus:"open" });
