var mongoose = require("mongoose");

var Investments = mongoose.model("Investments");

var Investors = mongoose.model("Investors");

var Companies = mongoose.model("Companies");

module.exports = (function(){
	return {
		create: function(req, res){
			console.log("DING investments controller create");

			var investment = new Investments({amount: req.body.amount, projectTitle: req.body.projectTitle, investorName: req.body.name});
			console.log("Saving investment to company id:", req.body.companyId);

					Companies.findOne({_id: req.body.companyId}, function(err, company){
						if (err){
							console.log("DING find company, errors:", err);
						} else {
							console.log("DING find company:", company);
							company.investments.push(investment);
							company.currentTotal += investment.amount;

							investment.save(function(err, result){
								if(err){
									console.log("Something went wrong with saving the investment to db.");
								} else {
									company.save(function(err){
										if(err){
											console.log("Something went wrong saving the company to db.");
										} else {
											console.log("Successfully added the investment to db.");
											res.json(result);
										}
									});
								}
							});
						}
					});
				

			

			
		},

		read: function(req,res){
			console.log("DING investments controller read");
			Investments.find({_id: req.investmentId}, function(err, results){
				if(err){
					console.log(err);
				} else {
					res.json(results);
				}
			});
		},

		update: function(req, res){
			console.log("DING investments controller update");
			Investments.update({_id: req.body._id}, req.body, function(err, result){
				console.log("update error:", err);
				console.log("update result:", result);
			});
		},

		destroy: function(req,res){
			console.log("DING investments controller remove");

			Investments.remove({_id: req.body._id}, function(err, result){
				if (err){
					console.log("investment remove errors:", err);
				} else {
					console.log("investment remove result:", result);
				}
			});
		}
	}
})();