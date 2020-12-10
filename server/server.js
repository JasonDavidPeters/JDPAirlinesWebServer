var http = require('http');
var PORT = 8080;
var css = require('./load/Css.js');
var image = require('./load/Image.js');
var route = require('./Routing.js');

function handleResponse(request, response) {
	
	var cssFile = css.loadCss(request.url);
	if (cssFile != null) {
		response.write(cssFile);
		response.end();
	}
	if ((imageFile = image.loadImage(request.url)) != null) {
		response.write(imageFile);
		response.end();
	}
	route.routeClient(request,response);
}

http.createServer(handleResponse).listen(PORT);