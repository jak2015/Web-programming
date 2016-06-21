var strModule = require("./string.js"),
    numberModule = require("./numbers.js"),
    objectModule = require("./objects.js"),
    arrayModule = require("./arrays.js"),
    dateModule = require("./dates.js");

/*==================================STRING=================================================*/
console.log("/*==============================STRING==================================*/");

try{
	strModule.occuranceofSubstring("I learned to play the Ukulele in Lebanon.", "le");
}
catch(e){
	console.log("Error :" +e);
}

try{
	strModule.occuranceofSubstringInsensitive("I learned to play the Ukulele in Lebanon.", "Le");
}
catch(e){
	console.log("Error :" +e);
}

var paragraph =  [
		'Most students like the freedom they have in college.', 
		'Usually college students live on their own, in the dormitory or in an apartment.',
		'This means they are free to come and go as they like.',
		'Their parents can’t tell them when to get up, when to go to school, and when to come home. ',
		'It also means that they are free to wear what they want.',
		'There are no parents to comment about their hair styles or their dirty jeans.', 
		'Finally, they are free to listen to their favorite music without interference from parents.',
];

try{
	strModule.randomizeSentences(paragraph);
}
catch(e){
	console.log("Error :" +e);
}
console.log("");

/*==================================NUMBERS================================================*/

console.log("/*==============================NUMBERS==================================*/");

try{
	console.log("Area of triangle is = "+numberModule.triangleArea(1,1));
}
catch(e){
	console.log("Error :" +e);
}

try{
	console.log("Perimeter of triangle is = "+numberModule.perimeterOfTriangle(1,1,2));
}
catch(e){
	console.log("Error :" +e);
}

try{
	console.log("Area of square is = "+numberModule.areaOfSquare(2));
}
catch(e){
	console.log("Error :" +e);
}

try{
	console.log("Perimeter of square is = "+numberModule.perimeterOfSquare(2));
}
catch(e){
	console.log("Error :" +e);
}

try{
	console.log("Area of cube is = "+numberModule.areaOfCube(2));
}
catch(e){
	console.log("Error :" +e);
}

try{
	console.log("Surfacearea of cube is = "+numberModule.surfaceAreaOfCube(2));
}
catch(e){
	console.log("Error :" +e);
}

try{
	console.log("Perimeter of cube is = "+numberModule.perimeterOfCube(2));
}
catch(e){
	console.log("Error :" +e);
}

try{
	console.log("Circumference of circle is = "+numberModule.circumferenceOfCircle(2));
}
catch(e){
	console.log("Error :" +e);
}

try{
	console.log("Area of circle is = "+numberModule.areaOfCircle(1));
}
catch(e){
	console.log("Error :" +e);
}
console.log("");

/*==================================OBJECTS================================================*/

console.log("/*==============================OBJECTS==================================*/");

var InfoCloneObject = {
	FirstName: "Jayshree",
	LastName: "Kanse",
	OtherDetails:
	{
		SubjectsTaken: "Web Programming",
		ClassTiming: "Friday 12 to 3"
	},
	ExtraDetails:
	{
		Hobbies:"Listening music",
		BirthDate:"31/01/1993"
		
	}
};
console.log("");
console.log(objectModule.shallowClone(InfoCloneObject));

console.log("");
console.log(objectModule.deepClone(InfoCloneObject));
console.log("");

/*==================================ARRAYS================================================*/

console.log("/*==============================ARRAYS==================================*/");

var baseArr = ["mip", "map", "mop", "mup", "mep"];

try{
	console.log("Shallow Clone Array :-");
	console.log(arrayModule.shallowClone(baseArr));
}
catch(e){
	console.log("Error :" +e);
}

try{
	console.log("");
	console.log("Randomized Array :-");
	console.log(arrayModule.randomized(baseArr));
}
catch(e){
	console.log("Error :" +e);
}
console.log("");

/*==================================DATES================================================*/

console.log("/*==============================DATES==================================*/");

try{
	var someDate = new Date(2017,13,09);
	console.log("Number of days between the two dates are : " +dateModule.daysUntil(someDate) +" day's");
}
catch(e){
	console.log("Error :" +e);
}

try{
	console.log("Number of days left in the year are : " +dateModule.daysLeftInYear() +" day's");
}
catch(e){
	console.log("Error :" +e);
}

try{
	someDate = new Date(2016,01,06);
	console.log("Number of days passed are : " +dateModule.daysSince(someDate) +" day's");
}
catch(e){
	console.log("Error :" +e);
}

try{
	console.log("Next date that is both a Friday and the 13th on,"+dateModule.nextFridayTheThirteenth());
}
catch(e){
	console.log("Error :" +e);
}

/*==================================END===================================================*/
