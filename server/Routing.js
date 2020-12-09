/*
	When the client connects to the server, it sends a request
	if the request can be fulfilled by the appropriate web page
	then we send that html page
	
	request url = /home, send index.html
	request url = /flights, send flights.html
*/
var fs = require('fs');
var css = require('./Css.js');

module.exports.routeClient=function routeClient(request, response) {
	response.writeHead('200', {'Content-Type': 'text/html'});

	var requestDir = request.url;
	switch(requestDir) {
		case '/home':
			var stream = fs.createReadStream('../website/index.html');
			stream.pipe(response);
		break;
		case '/flights':
			var stream = fs.createReadStream('../website/index.html');
			stream.pipe(response);
		break;
		default:
			var stream = fs.createReadStream('../website/index.html');
			stream.pipe(response);
			break;
		
		response.end();
	}
	
}
