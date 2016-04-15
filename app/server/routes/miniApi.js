var Mini = require('../models/mini');
var bodyParser = require('body-parser');
var config = require('../../config');
var jwt = require('jsonwebtoken');
var superSecret = config.SUPERSECRET;
module.exports = function(express){
  var miniApi = express.Router();

  miniApi.use(function(req, res, next) {
    // do logging
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    // decode token
    if (token) {
      // verifies secret and checks exp
      jwt.verify(token, superSecret, function(err, decoded) {
        if (err) {
          res.status(403).send({
            success: false,
            message: 'Failed to authenticate token.'
            });
        } else {
            req.decoded = decoded;
        }
        next(); // make sure we go to the next routes and don't stop here
      });
    }
  });

  miniApi.route('/mini')
  //Return all minis
  .get(function(req, res){
    Mini.find({}, function(err, minis){
      if(err){
        res.json({success: false, message: err});
      }else{
        res.json(minis);
      }
    })
  })
  //Store one mini
  .post(function(req, res){
    var mini = new Mini();
    mini.title = req.body.title;
    console.log('Mini',mini);
    mini.content = req.body.content;
    console.log('Mini',mini);
    mini.userId = req.body.userId;
    console.log('Mini',mini);
    mini.save(function(err){
      if(err){
        res.json({success: false, message: err});
      }else{
        res.json({success: true, message: 'Mini created!'});
      }
    })
  });

  miniApi.route('/mini/:miniId')
  //Delete mini
  .delete(function(req, res){
    Mini.remove({_id : req.params.miniId}, function(err, mini){
      if(err){
        res.json({success: false, message: err});
      }else{
        res.json({success: true, message: 'Mini removed!'});
      }
    });
  })
  //Update mini
  .put(function(req, res){
    Mini.findById(req.params.miniId, function(err, mini){
      if(err){
        res.json({success: false, message: err});
      }else{
        mini.title = req.body.title;
        mini.save();
        res.json({success: true, message: 'Mini updated!'});
      }
    })
  });

  return miniApi;
}
