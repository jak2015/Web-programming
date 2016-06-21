// We first require our express package
var express = require('express');
var bodyParser = require('body-parser');
var myData = require('./data.js')

// This package exports the function to create an express instance:
var app = express();

// This is called 'adding middleware', or things that will help parse your request
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

function perMonthRetirementSavings(response,years, perMonth, interestRate) 
{
    try {
        var retirementAmount = myData.getretirementAmountIfSavingPerMonth(years, perMonth, interestRate);
        response.json({status:"success", result:retirementAmount});
    } catch (e) {
        response.status(500).json({ status:"Error", message: e });
    }
}

function investedAmount(response, years, initial, interestRate) 
{
    try {
        var investedAmount = myData.investedAmountAfterSomeYears(years, initial, interestRate);
        response.json({status:"success", result:investedAmount});
    } catch (e) {
        response.status(500).json({ status:"Error", message: e });
    }
}

function loanPayoff(response, monthlyAmount, loanAmount, interestRate) 
{
    try {
        var monthstpayoffloan = myData.monthsToPayOffLoan(monthlyAmount, loanAmount, interestRate);
        response.json({status:"success", result:monthstpayoffloan});
    } catch (e) {
        response.status(500).json({ status:"Error", message: e });
    }
}

// We can now navigate to localhost:3000
app.listen(3000, function () {
    console.log('Your server is now listening on port 3000! Navigate to http://localhost:3000 to access it');
});


app.get("/api/perMonthRetirementSavings/", function (request, response) {
	var years = request.query.years;
	var perMonth = request.query.perMonth;
	var interestRate = request.query.interestRate;
    perMonthRetirementSavings(response, years, perMonth, interestRate);
});

app.get("/api/investedAmount/", function (request, response) {
	var years = request.query.years;
	var initial = request.query.initial;
	var interestRate = request.query.interestRate;
    investedAmount(response, years, initial, interestRate);
});

app.get("/api/loanPayoff/", function (request, response) {
	var monthlyAmount = request.query.monthlyAmount;
	var loanAmount = request.query.loanAmount;
	var interestRate = request.query.interestRate;
    loanPayoff(response, monthlyAmount, loanAmount, interestRate);
});