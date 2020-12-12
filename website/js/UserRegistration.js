/*
	Incorporate noSQL database
	-----
	Send a message to the server
*/

function validEmailAddress(email) {
	// Use regex?
	var regex = RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
	if (regex.test(email)) {
		return true;
	}
	return false;
}
function validUsername(name) {
		var regex = RegExp(/^\S+\w{3,15}\S{1,}/);
		if (regex.test(name)) {
			return true;
		}
	return false;
}
function validPassword(password) {
		if (password.length >= 10 && password.length <= 20) {
			var regex = RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{10,20}$/);
			if (regex.test(password)) {
				return true;
			}
		/*
			password format? 
			- Must be more than 10-20 characters
			- At least one uppercase character and 1 symbol, and 1 digit
		*/
	}
	return false;
}

function registerUser() {
	var username = document.getElementById("usernameBox").value;
	var password = document.getElementById("passwordBox").value;
	var email = document.getElementById("emailBox").value;
	
//	if (username.length < 3 || password.length < 3 || email.length < 3) {
//		alert("Please make sure your information is longer than 3 characters");
//		return;
//	}
	if (!(validEmailAddress(email))) {
		alert("Please enter a valid email address");
		console.log("Invalid email address");
		return;
	}
	if (!(validPassword(password))) {
		alert("Please enter a valid password (Must contain:\n1 uppercase letter, \nlowercase letter, \nbe between 10-20 characters, \ncontain 1 symbol)");
		return;
	}
	if (!(validUsername(username))) {
		alert("Please enter a valid username (Must be:\n between 4-14 characters in length\n no whitespaces)");
		return;
	}
	
	if (validUsername(username) && validPassword(password) && validEmailAddress(email)) {

		var data = {
			"username" : username,
			"password" : password,
			"email" : email
		};
		
		var xhr = new XMLHttpRequest();
		
		xhr.open("POST", "/register", true);
		console.log(xhr);
		xhr.setRequestHeader("Content-Type", "application/json");
		
		var stringData = JSON.stringify(data);
		
		xhr.onreadystatechange = function() {
			console.log(xhr.status);
			console.log(xhr.readyState);
			if(xhr.readyState === XMLHttpRequest.DONE) {
				if (xhr.status == 201) {
					alert("Your account has been created.");
					//TODO redirect the user
				} else {
					alert("This email address is already in use.");
				}
			}
		};
		
		xhr.send(stringData);
	}
}