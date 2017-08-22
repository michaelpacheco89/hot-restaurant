var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

var reservation = [];

app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname, "home.html"));
	res.end();
});

app.get("/tables",function(req, res) {
	res.sendFile(path.join(__dirname, "view.html"));
	res.end();
});

app.post("/reserve", function(req, res) {
	var newreserve = req.body;
	reservation.push(newreserve);
	console.log(newreserve);
	console.log(reservation);
	res.end();
});

app.listen(PORT, function() {
	console.log("Listening to PORT " + PORT);
});