var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
  username: {type: String, required: true},
  miniId: {type: String, required: true},
  comment : {type: String, required: true, maxLength: 200},
  createdAt: {type: Date, required: true, default: Date.now},
  deleted: {type: Boolean, required: true, default: false}
});

module.exports = mongoose.model('Comment', commentSchema);
