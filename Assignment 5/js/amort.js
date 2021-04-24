function getValues(){

	var balance = parseFloat(document.getElementById("pv").value);
	var interestRate =
		parseFloat(document.getElementById("rate").value/100.0);
	var terms = parseInt(document.getElementById("nper").value);

	//output result
	var div = document.getElementById("Result");

	//validate inputs
	var balVal = validateInputs(balance);
	var intrVal = validateInputs(interestRate);

	if (balVal && intrVal)
	{
		//Returns div string if inputs are valid
		div.innerHTML += amort(balance, interestRate, terms);
	}
	else
	{
		//returns error if inputs are invalid
		div.innerHTML += "Please Check your inputs and retry - invalid values.";
	}
}

function amort(balance, interestRate, terms)
{

	var monthlyRate = interestRate/12;
  var yearterms = terms * 12;
  var payment = balance * (monthlyRate/(1-Math.pow(
      1+monthlyRate, -yearterms)));
  var result = "";

  //table headers
	result += "<table border='2', align=center><tr><th>Beg. Balance</th><th>Payment</th>"+
        "<th>Interest</th><th>Principal</th><th>Balance</th><th>Period</th>";

	for (var count = 0; count < yearterms; ++count)
	{

    var interest = 0;
		var monthlyPrincipal = 0;
    var newBalance = 0;

		//create table
		result += "<tr align=center>";

    //beg. balance
    result += "<td> $" + balance.toFixed(2) + "</td>";

    //payment
    result += "<td> $" + payment.toFixed(2) + "</td>";

    //interest
		interest = balance * monthlyRate;
		result += "<td> $" + interest.toFixed(2) + "</td>";

    //pricipal
		monthlyPrincipal = payment - interest;
		result += "<td> $" + monthlyPrincipal.toFixed(2) + "</td>";

    //balance
    newBalance = balance - monthlyPrincipal;
    result += "<td> $" + newBalance.toFixed(2) + "</td>";

		//period
		result += "<td>" + (count + 1) + "</td>";

		//end table
		result += "</tr>";

		//update the balance for each loop iteration
		balance = balance - monthlyPrincipal;
	}

	//return string and closes entire table
    result += "</table>";

	//returns the concatenated string to the page
    return result;
}

function validateInputs(value)
{

//validate inputs
if ((value == null) || (value == ""))
	{
		return false;
	}
	else
	{
		return true;
	}
}
