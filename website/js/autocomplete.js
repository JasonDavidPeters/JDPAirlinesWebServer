
var maxSuggestions = 5; // Maximum suggestions that will be displayed in the auto suggest
var airports = airports; // Reference external array so we later don't go looking for it.
var validAirports =	new Set(); // Using a set object as to remove the need to check for duplicate values

function autoComplete() {
	var input = searchBox.value;
	
	for (var i = 0; i < airports.length; i++) {
		if (((airports[i].name).toLowerCase()).includes((input.toLowerCase()))) {
			if (validAirports.length >= maxSuggestions) {
				return;
			} else {
				// check if the array contains the 
				validAirports.add(airports[i]);
			}
			// add the result to an array
		} else {
			if (validAirports.has(airports[i]))validAirports.delete(airports[i]);
			var e = document.getElementById(airports[i].name);
			if (e != null)
			searchBox.parentElement.removeChild(e);
			
		}
	}
	var arrayConvert = Array.from(validAirports);
	
	for (var j = 0; j < arrayConvert.length; j++) {
		// create html element 
		var suggestion = document.createElement("div");
		suggestion.id = arrayConvert[j].name;
		suggestion.style.position = "absolute";
		suggestion.style.color="black";
		suggestion.style.backgroundColor="white";
		suggestion.style.borderColor="black";
		suggestion.style.borderStyle="solid";
		suggestion.innerHTML = arrayConvert[j].name;
		suggestion.style.height="38px";
		suggestion.style.width="200px";
		suggestion.style.backgroundColor="0";
		suggestion.style.top="calc("+(j+1)+"*38px)";
		suggestion.style.bottom="0";
		suggestion.style.left="0";
		suggestion.style.right="0";
	//	if (!document.body.contains(document.getElementById(suggestion.id)))
		//console.log(searchBox.parentElement);
		var parent = searchBox.parentElement;
		if (document.getElementById(arrayConvert[j].name) == null) {
			parent.appendChild(suggestion);
			// if it doesn't already exist then we can append it
			return;
		}
			
		var yPos = window.getComputedStyle(document.getElementById(arrayConvert[j].name)).getPropertyValue('top');
		
		console.log("position: " + j + " current y position:" + yPos + " " + (j+1)*38);
		if (((j+1)*38) < parseInt(yPos)) {
			console.log("updating");
			document.getElementById(arrayConvert[j].name).style.top="calc("+(j+1)+"*38px)";

		}
		// if get top attribute > current calculation, reset top attribute
		
		// TODO: if an element is removed, take previous position
		
	}
	
	/*
		Iterate through the set 'validAirports' and create an element for each index.
	*/
	
	/*
		Need an object array of airports { countryofAirport, codeofAirport, nameofAirport } 
		If I can somehow load the data from a pdf and use a separator to create an array of objects.
		
		Server-side: createFileReadStream, send the data
		maybe the client will link a json file and we can write it
					
	*/
	

	
}