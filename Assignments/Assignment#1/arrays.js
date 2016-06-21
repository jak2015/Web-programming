var exports = module.exports = {};

exports.shallowClone = function(TempObject)
{
	if(TempObject == "")
		throw "Array is blank"
	
	var CloneArray = [];
	CloneArray = TempObject;
	return CloneArray.slice();
}

exports.randomized = function(TempObject)
{
	if(TempObject == "")
		throw "Array is blank"
	
	var CloneArray = [];
	CloneArray = TempObject;
	var counter,random_index;

	for (counter = CloneArray.length - 1; counter > 0; counter--) 
	{
        random_index = Math.floor(Math.random() * (counter + 1));
        var temp = CloneArray[counter];
        CloneArray[counter] = CloneArray[random_index];
        CloneArray[random_index] = temp;
    }
    return CloneArray;
}

