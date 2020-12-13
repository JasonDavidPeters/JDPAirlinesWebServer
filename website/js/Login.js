/*
	if the user pressed enter then validate 
*/

function checkLogin() { 
	if (event.keyCode != 13) return;
	
	var username = document.getElementById("usernameInput").value;
	var password = document.getElementById("passwordInput").value;
	
	var xhr = new XMLHttpRequest();
	
	xhr.open("POST", "/login", true);
	
	var data = {
		"username": username,
		"password": password
	};

	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send(JSON.stringify(data));
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState == XMLHttpRequest.DONE) {
			if (xhr.status == 201) {
				console.log("logged in successfully");
				setCookie("username",username,30);
				var url = "/home";
				window.location.href = url;
			} else {
				document.getElementById("loginErrorText").style.visibility="visible";
				console.log("login error");
			}
		}
	}
	
	//check if username exists
	// check if password is correct
	// is keep me logged in checked?
}