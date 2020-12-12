/*
	When the client connects to the server, it sends a request
	if the request can be fulfilled by the appropriate web page
	then we send that html page
	
	request url = /home, send index.html
	request url = /flights, send flights.html
*/
var fs = require('fs');
var dbUrl = 'mongodb+srv://jaydeepee:fIYbItQIlrKy7tl6@cluster0.vpiad.mongodb.net/JDPAirlines?retryWrites=true&w=majority';
var dbName = 'JDPAirlines';
var mongoClient = require('mongodb').MongoClient;

module.exports.routeClient=function routeClient(request, response) {
	response.writeHead('200', {'Content-Type': 'text/html'});
	var requestDir = request.url;
	switch(requestDir) {
		case '/home':
			var stream = fs.createReadStream('../website/index.html');
			stream.on('error', function() {
				console.log("Could not load index.html!!");
			})
			stream.pipe(response);
		break;
		case '/flights':
			var stream = fs.createReadStream('../website/flights.html');
			stream.on('error', function() {
				console.log("Could not load flights.html!!");
			})
			stream.pipe(response);
		break;
		case '/contact':
			var stream = fs.createReadStream('../website/contact.html');
			stream.on('error', function() {
				console.log("Could not load contact.html!!");
			})
			stream.pipe(response);
		break;
		case '/about':
			var stream = fs.createReadStream('../website/about.html');
			stream.on('error', function() {
				console.log("Could not load about.html!!");
			})
			stream.pipe(response);
		break;
		case '/login':
			if (request.method == 'POST') {
				request.on('data', function(data) {
					var userData = JSON.parse(data);
					// query database
					mongoClient.connect(dbUrl, null, function(err, db) {
						var database = db.db(dbName);
						var collection = database.collection("users");
						var query = {"username":userData.username,
									"password":userData.password};
						console.log(query);
						collection.find(query).toArray(function(err,result) {
							if (err || result.length < 1) {
								response.writeHead(200);
								response.end();
							} else {
								response.writeHead(201);
								response.end();
							}
							
						});
					});
				});
			} else {
				var stream = fs.createReadStream('../website/login.html');
				stream.on('error', function() {
					console.log("Could not load login.html!!");
				})
				stream.pipe(response);
			}
		break;
		case '/register':
			/*
				Check for incoming data
			*/
			if (request.method == 'POST') {
				request.on('data', function(data) {
					var userData = JSON.parse(data);
					mongoClient.connect(dbUrl, null, function(err,db) {
						var database= db.db(dbName);
						var collection = database.collection("users");
						var query = { "email" : userData.email };
						collection.find(query).toArray(function(err,result) {
							if (err || result.length < 1) {
								collection.insertOne(JSON.parse(data));
								console.log("inserting data");
								response.writeHead(201);
								response.end();
								// send response 200
								return;
							} else {
								//response.write("This user already exists");
								response.writeHead(200);
								response.end();
								// send response error
							}
						})
					})
				})
			} else {
			var stream = fs.createReadStream('../website/register.html');
				stream.on('error', function() {
				console.log("Could not load register.html!!");
			})
			stream.pipe(response);
			}
		break;
		default:
			var stream = fs.createReadStream('../website/index.html');
			stream.on('error', function() {
				console.log("Could not load this page");
			})
			stream.pipe(response);
			break;
		
		response.end();
	}
	
}
