/**
 * VoterController
 *
 * @description :: Server-side logic for managing voters
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


var generic = require('generic');

module.exports = {

	home: function(req, res){
		res.view('homepage');
	},


	vote: function(req, res){
		sails.log("in vote: "+req.body.email);
		sails.log("in vote: "+req.body.vote);

		var voter = req.body;
		var alreadyVoted = false;
		Voter.find()
		.where({email: voter.email}).exec(function(err, voters){
			if(voters.length > 0){
				console.log(voters);
				console.log("you have voted already");

				return res.send("Sorry we can not accept your vote. You have voted before. ");

			}else{
				Voter.create(voter).
					then(
						function(data){
							console.log("done creating ..."+data)


							var mailOptions = {
									 	       	from: "vote@usac.org",
													to  : voter.email,
													subject: "Thank you",
													text: "Your vote has been registered.",
													html: "<p>you got the <strong>idea</strong>.</p>"
											}

							generic.emailService.init('google', 'sameerkvaidya@gmail.com', 'sportster883');
							generic.emailService.send(mailOptions);

							return res.send(" Thank you for voting. Your vote is important to us.");
						})
					.error(
						function(err){	
							console.log("err "+err);
							return res.send(" there was error processing your request.");
						});


			}
		})


		
	},


};

