var exports = module.exports = {};

// You can now add export properties to the exports object to be accessible from outside this file

exports.getretirementAmountIfSavingPerMonth = function(yearsUntilRetirement, amountSavingPerMonth, yearlyInterestRateOfInvestment)
 {
	yearsUntilRetirement = parseInt(yearsUntilRetirement);
	amountSavingPerMonth = parseInt(amountSavingPerMonth);
	yearlyInterestRateOfInvestment = parseFloat(yearlyInterestRateOfInvestment);

	var runningTotal = 0;
	
	if(yearlyInterestRateOfInvestment > 1)
		throw "Interest rate can not be greater than 1";
	if(yearsUntilRetirement <= 0 || amountSavingPerMonth <= 0 || yearlyInterestRateOfInvestment <= 0)
	{
		throw "Input can not be negative or zero";
	}
	else if(isNaN(yearsUntilRetirement) || isNaN(amountSavingPerMonth) || isNaN(yearlyInterestRateOfInvestment))
	{
		throw "Provide a valid input";
	}
	else
	{
		for(var i=0; i < (yearsUntilRetirement*12); i++)
		{
			runningTotal = (runningTotal + amountSavingPerMonth) * (1 + yearlyInterestRateOfInvestment / 12);
		}
	}
	runningTotal = runningTotal.toString();
	return runningTotal;
 };
 
exports.investedAmountAfterSomeYears = function(yearsInvesting, initialAmount, yearlyInterestRateOfInvestment)
{
	yearsInvesting = parseInt(yearsInvesting);
	initialAmount = parseInt(initialAmount);
	yearlyInterestRateOfInvestment = parseFloat(yearlyInterestRateOfInvestment);
	
	var runningTotal = initialAmount ;
	
	if(yearlyInterestRateOfInvestment > 1)
		throw "Interest rate can not be greater than 1";
	if(yearsInvesting <= 0 || initialAmount <= 0 || yearlyInterestRateOfInvestment <= 0)
	{
		throw "Input can not be negative or zero";
	}
	else if(isNaN(yearsInvesting) || isNaN(initialAmount) || isNaN(yearlyInterestRateOfInvestment))
	{
		throw "Provide a valid input";
	}
	else
	{
		for(var i=0; i < yearsInvesting; i++)
		{
			runningTotal = runningTotal * (1 + yearlyInterestRateOfInvestment);
		}
		runningTotal = runningTotal.toString();
		return runningTotal;
	}
};
 
exports.monthsToPayOffLoan = function(monthlyPaymentAmount, initialLoanAmount, yearlyInterestRateOfLoan)
{
	monthlyPaymentAmount = parseInt(monthlyPaymentAmount);
	initialLoanAmount = parseInt(initialLoanAmount);
	yearlyInterestRateOfLoan = parseFloat(yearlyInterestRateOfLoan);
	
	if(yearlyInterestRateOfLoan > 1)
		throw "Interest rate can not be greater than 1";
	if(monthlyPaymentAmount <= 0 || initialLoanAmount <= 0 || yearlyInterestRateOfLoan <= 0)
	{
		throw "Input can not be negative or zero";
	}
	else if(isNaN(monthlyPaymentAmount) || isNaN(initialLoanAmount) || isNaN(yearlyInterestRateOfLoan))
	{
		throw "Provide a valid input";
	}
	else
	{
		var month = 1;
		var runningTotal = initialLoanAmount;
		while(runningTotal > 0)
		{
			runningTotal = runningTotal * (1 + yearlyInterestRateOfLoan / 12) - monthlyPaymentAmount;
			month = month +1;
		}
	}
	month = month.toString();
	return month;
};