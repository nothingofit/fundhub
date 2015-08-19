var Companies = require("../controllers/companies.js");

var Investments = require("../controllers/investments.js");

var Investors = require("../controllers/investors.js");

var Projects = require("../controllers/projects.js");

module.exports = function(app){

	app.get("/show_a_company/:id", function(req,res){
		Companies.readOne(req,res);
	});

	app.post("/create", function(req,res){
		Projects.create(req, res);
	});

	app.get("/getPopularProjects", function(req, res){
		Projects.findPopular(req,res);
	});

	app.get("/getRecentlyFunded", function(req, res){
		Projects.findRecent(req,res);
	});

	app.get("/createCompany", function(req, res){
		Companies.create(req,res);
	});

	app.post("/signup", function(req, res){
		console.log("I'm in routes", req.body);
	});

}