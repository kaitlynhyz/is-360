function getValues(){

	var balance = parseFloat(document.getElementById("pv").value);
  var deposit = parseFloat(document.getElementById("deposit").value);
	var interestRate = parseFloat(document.getElementById("rate").value/100.0);
	var terms = parseInt(document.getElementById("nper").value);

	//output result
	var div = document.getElementById("Result");

	//validate inputs
	var balVal = validateInputs(balance);
  var depVal = validateInputs(deposit);
	var intrVal = validateInputs(interestRate);
  var termVal = validateInputs(terms);

	if (balVal && depVal && intrVal && termVal)
	{
		//Returns div string if inputs are valid
		div.innerHTML += fv(balance, deposit, interestRate, terms);
	}
	else
	{
		//returns error if inputs are invalid
		div.innerHTML += "Invalid values";
	}
}

function fv(balance, deposit, interestRate, terms)
{

	var monthlyRate = interestRate/12;
  var yearterms = terms * 12;
	var recurring = deposit;
  var payment = balance * (monthlyRate/(1-Math.pow(
      1+monthlyRate, -yearterms)));
  var result = "";


  //table headers
	result += "<table border='2', align=center><tr><th>Period</th><th>Present Value</th>"+
        "<th>Deposit</th><th>Interest</th><th>New Balance</th>";

	for (var count = 0; count < yearterms; ++count)
	{

    var interest = 0;
    var newBalance = 0;

		//create table
		result += "<tr align=center>";

    //period
		result += "<td>" + (count + 1) + "</td>";

    //beg. balance
    result += "<td> $" + balance.toFixed(2) + "</td>";

    //recurring deposit
		result += "<td> $" + recurring.toFixed(2) + "</td>";

    //current interest
		interest = balance * monthlyRate;
		result += "<td> $" + interest.toFixed(2) + "</td>";

    //new balance
		newBalance = balance + interest;
		result += "<td> $" + newBalance.toFixed(2) + "</td>";

		//end table
		result += "</tr>";

		//update the balance for each loop iteration
		balance = newBalance;

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
