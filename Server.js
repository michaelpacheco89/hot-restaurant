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
var waitlist = [];

app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables",function(req, res) {
	res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/api/tables",function(req, res) {
	res.send(reservation);
});

app.get("/api/waitlist",function(req, res) {
	res.send(waitlist);
});

app.get("/api/view",function(req, res) {
	var all = [reservation, waitlist];
	res.send(all);
});

app.get("/tables#",function(req, res) {
	reservation=[];
	waitlist=[];
	res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/reserve", function(req, res) {
	res.sendFile(path.join(__dirname, "make.html"));
});

app.post("/api/reserve", function(req, res) {
	var newreserve = req.body;
	if (reservation.length < 5) {
		reservation.push(newreserve);
		res.send(true);
	}
	else {
		waitlist.push(newreserve);
		res.send(false);
	}
	console.log("The number of persons in waitlist is: " + waitlist.length);
	console.log("The number of persons in reservation list is: " + reservation.length);
});

app.listen(PORT, function() {
	console.log("Listening to PORT " + PORT);
});
