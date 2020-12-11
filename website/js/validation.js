function validate() {
	var from = document.getElementById("flyingFrom").value;
	var to = document.getElementById("flyingTo").value;
	var departDate = document.getElementById("departDate").value;
	var returnDate = document.getElementById("returnDate").value;
	var classType = document.getElementById("class").value;
	var checks = 0;
	
	//console.log(validateClass(classType));
	//checkValidDate(departDate, returnDate)
	if (from.length > 3 && to.length > 3 &&
	checkValidAirport(from)
		&& checkValidAirport(to))
			checks++;
		else
			alert("Please enter valid airports"); 
		
		if (document.getElementById("returnDate").disabled)
			returnDate=departDate;
		if (checkValidDate(departDate, returnDate)) // need  to check if one-way is checked
			checks++;
		else
			alert("Please enter valid depart and return dates");
		
	
		if (validateClass(classType))
			checks++;
			else
			alert("Please enter a valid class");
	
		if (checks>3) console.log("all data is valid");// go to /flights
	/*
		Loop through airports array
		
		Make sure that the correct fields are filled out
		
		If all checks out then we can proceed to the next page
		
		else
		
		send validation messages 'fill in this field' etc.
	*/

}

function validateClass(clazz) {
	if ((clazz.toLowerCase()) === "economy"
		||(clazz.toLowerCase()) === "business"
		|| (clazz.toLowerCase()) === "first class")
		return true;
		
		return false;
}

function checkValidDate(date, date2) {
	var currentDate = new Date();
	var currentDay = currentDate.getDate();
	var currentMonth = currentDate.getMonth()+1;
	var currentYear = currentDate.getFullYear();
	
	date = [
		{
			// Depart date
			"day": date.split("-")[2],
			"month": date.split("-")[1],
			"year": date.split("-")[0]
		},
		{
			// Return date
			"day": date2.split("-")[2],
			"month": date2.split("-")[1],
			"year": date2.split("-")[0]
		}
	];
	// Are both dates valid for the current date?
	
	console.log(currentDay + " " + currentMonth + " " + currentYear);
	console.log(date[0].day + " " + date[0].month + " " + date[0].year);
	console.log(date[1].day + " " + date[1].month+ " " + date[1].year);
	if (date[0].year < currentYear || date[1].year < currentYear) return false;
	// depart and return are for current year
	if (date[0].year == currentYear && date[1].year == currentYear) // years are correct
	if (date[0].month == currentMonth && date[0].day >= currentDay)
	if (date[1].month == currentMonth && date[1].day >= date[0].day) return true;
	
	//
	/*
		check that departure date is in the future
		and that the return date is on the same date as departure
		or beyond
	*/
	return false;
}

function checkValidAirport(airport) {
	if (airport.includes(","))
		airport=airport.substring(0,",");
	for (var i = 0; i < airports.length; i++) {
		if (((airports[i].name).toLowerCase()).includes((airport.toLowerCase()))) { 
			//console.log(myTrim(airports[i].name.toLowerCase()) +" "+ airport.toLowerCase());
			return true;
		}
	}
	return false;
}