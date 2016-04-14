var Mini = require('../models/mini');
var bodyParser = require('body-parser');
module.exports = function(express){
  var miniApi = express.Router();

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
    mini = req.body.title;
    mini = req.body.content;
    mini = req.body.userId;
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
        mini = req.body.mini;
        mini.save();
        res.json({success: true, message: 'Mini updated!'});
      }
    })
  });

  return miniApi;
}
