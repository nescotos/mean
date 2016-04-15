var User = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../../config');
module.exports = function(express){
  var apiAuth = express.Router();

  apiAuth.post('/register',function(req, res) {
			var user = new User();		// create a new instance of the User model
			user.password = req.body.password;  // set the users username (comes from the request)
			user.name = req.body.name;  // set the users password (comes from the request)
			user.username = req.body.username;
			user.save(function(err) {
				if (err) {
					// duplicate entry
					if (err.code == 11000)
						return res.json({ success: false, message: 'email must be unique'});
					else
						return res.send(err);
				}
				// return a message
				res.json({ success: true, message: 'user created' });
			});
		});
    apiAuth.route('/login')
    .post(function(req, res){
      //Finding the user
      User.findOne({username : req.body.username})
      .select('username password').exec(function(err, user){
        if(err){
          throw err;
        }
        //Do the user exist?
        if(!user){
          res.json({
            success: false,
            message: 'Invalid email or password'
          });
        } else if(user){
          var validPassword = user.comparePassword(req.body.password);
          if(!validPassword){
            res.json({
              success: false,
              message: 'Invalid email or password'
            })
          }else{
            //Creating Token
            var token = jwt.sign({
  	        	userId: user.id,
              username: user.username
  	        }, config.SUPERSECRET, {
  	          expiresIn: 60 * 60 * 24 // expires in 24 hours
  	        });
            //Response
            res.json({
              success: true,
              message: 'Login successful',
              token: token
            });
          }
        }
      });
    });

  return apiAuth;
}
