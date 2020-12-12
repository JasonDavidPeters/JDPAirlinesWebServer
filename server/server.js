var http = require('http');
var PORT = 8080;
var assets = require('./load/AssetLoader.js');
var route = require('./Routing.js');
function handleResponse(request, response) {
	
	console.log('Request: ' + request.url);
	var file = assets.loadFile(request.url);
	if (file != null) {
		response.write(file);
		response.end();
	}
	route.routeClient(request,response);
}

http.createServer(handleResponse).listen(PORT);