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
	res.end();
});

app.get("/tables",function(req, res) {
	res.sendFile(path.join(__dirname, "view.html"));
	res.end();
});

app.get("/api/tables",function(req, res) {
	res.send(reservation);
	res.end();
});

app.get("/api/waitlist",function(req, res) {
	res.send(waitlist);
	res.end();
});

app.post("/reserve", function(req, res) {
	var newreserve = req.body;
	if (reservation.length < 5) {
		reservation.push(newreserve);
	}
	else {
		waitlist.push(newreserve);
	};
	console.log(waitlist.length);
	console.log(reservation.length);
	res.end();
});

app.listen(PORT, function() {
	console.log("Listening to PORT " + PORT);
});