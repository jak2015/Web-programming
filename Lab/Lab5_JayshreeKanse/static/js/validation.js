// Remember, we're in a browser: prevent global variables from happening
// I am passing the jQuery variable into the IIFE so that
// I don't have to rely on global variable name changes in the future
(function ($) {

    var firstInputRetire = $("#yearsUntilRetirement");
    var secondInputRetire = $("#amountSavingPerMonth");
	var thirdInputRetire = $("#roi1");
	
	var firstInputInvest = $("#yearsInvesting");
    var secondInputInvest = $("#initialAmount");
	var thirdInputInvest = $("#roi2");
	
	var firstInputLoan = $("#monthlyPaymentAmount");
    var secondInputLoan = $("#initialLoanAmount");
	var thirdInputLoan = $("#roi3");
	
    var errorAlertRetire = $("#error-message-retire");
	var errorAlertInvest = $("#error-message-invest");
	var errorAlertLoan = $("#error-message-loan");
	
    var btnRetire = $("#btnretiresaving");
    var btnInvest = $("#btninvestedamt");
	var btnLoan = $("#btnpayoffloan");

    function extractInputsRetire() 
	{	
        var firstValue = firstInputRetire.val();	
		var secondValue = secondInputRetire.val();
		var thirdValue = thirdInputRetire.val();
		
		if (firstValue === "" && secondValue === "" && thirdValue === "") {
            throw "Provide an input";
        }

        if (firstValue === undefined || firstValue === "" || firstValue === null) {
            throw "No value provided for years until retirement";
        }

        if (secondValue === undefined || secondValue === "" || secondValue === null) {
			throw "No value provided for savings amount per month";
        }
		
        if (thirdValue === undefined || thirdValue === "" || thirdValue === null) {
			throw "No value provided for yearly rate of interest";
        }

        var firstNumber = parseInt(firstValue);
        var secondNumber = parseInt(secondValue);
		var thirdNumber = parseFloat(thirdValue);
		
        if (isNaN(firstNumber) || firstNumber <=0) {
            throw "Invalid input for years until retirement";
        }

        if (isNaN(secondNumber)|| secondNumber <=0) {
            throw "Invalid input for savings amount per month";
        }
		
		if (isNaN(thirdNumber) || thirdNumber <=0) {
            throw "Invalid input for yearly rate of interest";
        }
		
		if (thirdNumber >=1)
			throw "Rate of interest is out of range";
    }

	function extractInputsInvest() 
	{	
        var firstValue = firstInputInvest.val();	
		var secondValue = secondInputInvest.val();
		var thirdValue = thirdInputInvest.val();
		
		if (firstValue === "" && secondValue === "" && thirdValue === "") {
            throw "Provide an input";
        }

        if (firstValue === undefined || firstValue === "" || firstValue === null) {
            throw "No value provided for years investing";
        }

        if (secondValue === undefined || secondValue === "" || secondValue === null) {
			throw "No value provided for initial amount";
        }
		
        if (thirdValue === undefined || thirdValue === "" || thirdValue === null) {
			throw "No value provided for yearly rate of interest";
        }

        var firstNumber = parseInt(firstValue);
        var secondNumber = parseInt(secondValue);
		var thirdNumber = parseFloat(thirdValue);
		
        if (isNaN(firstNumber) || firstNumber <=0) {
            throw "Invalid input for years investing";
        }

        if (isNaN(secondNumber)|| secondNumber <=0) {
            throw "Invalid input for initial amount";
        }
		
		if (isNaN(thirdNumber) || thirdNumber <=0) {
            throw "Invalid input for yearly rate of interest";
        }
		
		if (thirdNumber >=1)
			throw "Rate of interest is out of range";
    }
	
	function extractInputsLoan() 
	{	
        var firstValue = firstInputLoan.val();	
		var secondValue = secondInputLoan.val();
		var thirdValue = thirdInputLoan.val();
		
		if (firstValue === "" && secondValue === "" && thirdValue === "") {
            throw "Provide an input";
        }

        if (firstValue === undefined || firstValue === "" || firstValue === null) {
            throw "No value provided for monthly payment amount";
        }

        if (secondValue === undefined || secondValue === "" || secondValue === null) {
			throw "No value provided for initial loan amount";
        }
		
        if (thirdValue === undefined || thirdValue === "" || thirdValue === null) {
			throw "No value provided for yearly rate of interest";
        }

        var firstNumber = parseInt(firstValue);
        var secondNumber = parseInt(secondValue);
		var thirdNumber = parseFloat(thirdValue);
		
        if (isNaN(firstNumber) || firstNumber <=0) {
            throw "Invalid input for monthly payment amount";
        }

        if (isNaN(secondNumber)|| secondNumber <=0) {
            throw "Invalid input for initial loan amount";
        }
		
		if (isNaN(thirdNumber) || thirdNumber <=0) {
            throw "Invalid input for yearly rate of interest";
        }
		
		if (thirdNumber >=1)
			throw "Rate of interest is out of range";
    }
	
	btnRetire.click(function () {
        errorAlertRetire.addClass('hidden');
        errorAlertRetire.text('');

        try {
            extractInputsRetire();
			return true;
            
        } catch (error) {
            errorAlertRetire.text(error);
            errorAlertRetire.removeClass('hidden');
			return false;
        }
    });
	
    btnInvest.click(function () {
        errorAlertInvest.addClass('hidden');
        errorAlertInvest.text('');

        try {
            extractInputsInvest();
			return true;
            
        } catch (error) {
            errorAlertInvest.text(error);
            errorAlertInvest.removeClass('hidden');
			return false;
        }
    });

	btnLoan.click(function () {
        errorAlertLoan.addClass('hidden');
        errorAlertLoan.text('');

        try {
            extractInputsLoan();
			return true;
            
        } catch (error) {
            errorAlertLoan.text(error);
            errorAlertLoan.removeClass('hidden');
			return false;
        }
    });

})(jQuery);
