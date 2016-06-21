var exports = module.exports = {};

exports.occuranceofSubstring = function(mainString, substr)
{
	if (mainString == "" || substr == ""){
		throw "Invalid input";
	}
	console.log("Occurance of Substring ");
	var i = 0
	var pos = -1;
	var count=0;
	while(i < mainString.length)
	{
		pos = mainString.indexOf(substr,pos+1);
		if(pos == -1){
			break;
		}else{
			count++;
		i=pos;
		i=i+1;
		}
	}
	console.log("\nMain String:"+mainString);
	console.log("\nSub String :"+substr);
	console.log("\nTotal count: "+count);
}

exports.occuranceofSubstringInsensitive = function(mainString, substr)
{	
	if (mainString == "" || substr == ""){
		throw "Invalid input";
	}
	console.log("\nMain String :"+mainString);
	mainString = mainString.toLowerCase();
	console.log("\nSubString :"+substr);
	substr = substr.toLowerCase();
	var i = 0;
	var pos = -1;
	var count = 0;
	while(i < mainString.length)
	{
		pos = mainString.indexOf(substr,pos+1);
		if(pos == -1){
			break;
		}else{
			count++;
		i = pos;
		i = i+1;
		}
	}
	
	console.log("\nTotal count: "+count);
}

exports.randomizeSentences = function(paragraph)
{
	if (paragraph == ""){
		throw "Invalid input";
	}
	var lengthstr = paragraph.length;
	console.log("\nGIVEN PARAGRAPH\n");
	i = 0;
	while(i<7){
		console.log(paragraph[i]);
		i++;
	}
	console.log("\nRANDOM PARAGRAPH\n");
	i = 0;
	j = 0;
	var arr = [];
	while(i<7){
		var index = Math.floor(Math.random()*(lengthstr))
		flag = false;
		for(k=0;k<arr.length;k++){
			if(arr[k] == index){
				flag=true;
				break;
			}
		}
		if(!flag){
			arr[i] = index;
			console.log(paragraph[index]);
			i++;
		}
	}
}



