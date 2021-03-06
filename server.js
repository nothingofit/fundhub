var express = require("express");

var path = require("path");

var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

require("./server/config/mongoose.js");
require("./server/config/routes.js")(app);

app.use(express.static(path.join(__dirname, "./client")));

app.listen(8000, function() {
	console.log("Loading on port 8000");
});