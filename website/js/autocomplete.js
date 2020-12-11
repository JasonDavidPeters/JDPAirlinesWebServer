
var maxSuggestions = 5; // Maximum suggestions that will be displayed in the auto suggest
var airports = airports; // Reference external array so we later don't go looking for it.
var validAirports =	new Set(); // Using a set object as to remove the need to check for duplicate values

function removeQuery() {
	var parent = this.parentElement;
	setTimeout(function() {
		/*
			Check for children of parent node, if they are equal to any of the airport nodes
			remove those children.
		*/
		for (var i = 0; i < airports.length; i++) {
			// go through children of parent and remove airport objects
			var e = document.getElementById(airports[i].name);
			if (e != null)
				parent.removeChild(e);
		}
	}, 300);
}

function autoComplete() {
	var input = this.value;
	
	for (var i = 0; i < airports.length; i++) {

		if ((((airports[i].name).toLowerCase()).includes((input.toLowerCase()))
			|| ((airports[i].code).toLowerCase()).includes((input.toLowerCase()))
			|| ((airports[i].state).toLowerCase()).includes((input.toLowerCase())))
			&& input.length > 3) {
			if (validAirports.size >= maxSuggestions) {
				break;
			} else {
				// check if the array contains the 
				validAirports.add(airports[i]);
			}
			// add the result to an array
		} else {
			if (validAirports.has(airports[i])) {
				validAirports.delete(airports[i]);
			}
			var e = document.getElementById(airports[i].name);
			if (e != null)
			this.parentElement.removeChild(e);
			
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
		suggestion.style.borderColor="gray";
		suggestion.style.borderStyle="solid";
		suggestion.innerHTML = arrayConvert[j].name + ", " + arrayConvert[j].state + " (" + arrayConvert[j].code+")";
		suggestion.style.height="38px";
		suggestion.style.width="200px";
		suggestion.style.backgroundColor="0";
		suggestion.style.top="calc("+(j+1)+"*38px)";
		suggestion.style.bottom="0";
		suggestion.style.left="0";
		suggestion.style.right="0";
		
		suggestion.addEventListener("click", event => {
			this.value = suggestion.innerHTML;
		});
	//	if (!document.body.contains(document.getElementById(suggestion.id)))
		//console.log(searchBox.parentElement);
		var parent = this.parentElement;
		if (document.getElementById(arrayConvert[j].name) == null) {
			parent.appendChild(suggestion);
			// if it doesn't already exist then we can append it
			return;
		}
			
		var yPos = window.getComputedStyle(document.getElementById(arrayConvert[j].name)).getPropertyValue('top');
		
		if (((j+1)*38) < parseInt(yPos)) {
			document.getElementById(arrayConvert[j].name).style.top="calc("+(j+1)+"*38px)";

		}
		// TODO add an onclick event to each suggestion element, set the value of 'this' input box
		
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