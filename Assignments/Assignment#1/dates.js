var exports = module.exports = {};

exports.daysUntil = function(someDate)
{
		var currDate;
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth(); //January is 0!
		var yyyy = today.getFullYear();
		currDate = new Date(yyyy,mm,dd);
		currDate.setMilliseconds(00);
		currDate.setSeconds(00);
		currDate.setHours(00);

		var diffDays = ((Math.abs(someDate - currDate)) / (1000 * 60 * 60 * 24));
		return diffDays;
}

exports.daysLeftInYear = function()
{
	var today = new Date();
	var todaydd = today.getDate();
	var todaymm = today.getMonth(); //January is 0!
	var todayyyyy = today.getFullYear();
	var endDate = new Date();
	endDate.setMonth(11); 
	endDate.setDate(31);
	endDate.setFullYear(todayyyyy);
	
	var daysLeft = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
	return daysLeft;
}

exports.daysSince = function(someDate)
{
	var currDate;
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth(); //January is 0!
	var yyyy = today.getFullYear();
	currDate = new Date(yyyy,mm,dd);
	currDate.setMilliseconds(00);
	currDate.setSeconds(00);
	currDate.setHours(00);

	var diffDays = ((Math.abs(currDate - someDate)) / (1000 * 60 * 60 * 24));
	return diffDays;
}

exports.nextFridayTheThirteenth = function()
{
	var endDate = new Date(2016,00,01);
	var endDay = endDate.getDay();
	var month = endDate.getMonth();
	var strMonth;
	
	while (true) 
	{
		endDay = endDate.getDay();
		if (endDay == 0){
			endDate.setDate(13);
			return endDate;
		}
		else{
			month++;
			endDate.setMonth(month);
		}
	}
}
