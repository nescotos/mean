var Comment = require('../models/comment');

module.exports =  function(express){
  var commentApi = express.Router();

  commentApi.route('/comment/:miniId')
  .get(function(req,res){
    Comment.find({miniId : req.params.miniId}, function(err, comments){
      if(err){
        res.json({success: false, message: err});
      }else {
        res.json(comments);
      }
    })
  })
  .delete(function(req, res){
    Comment.remove({miniId : req.params.miniId}, function(err, mini){
      if (err) {
        res.json({success : false, message: err});
      } else {

        res.json({success : true, message: 'Comment removed!'});
      }
    })
  })

  commentApi.route('/comment')
  .post(function(req, res){
    var comment = new Comment();
    comment.username = req.body.username;
    comment.miniId = req.body.miniId;
    comment.comment = req.body.comment;
    comment.save(function(err){
      if(err){
        res.json({success : true, message : 'Error saving events'});
      }else{
        res.json({success : false, message : 'Comment created'});

      }
    })
  })


  return commentApi;
}
