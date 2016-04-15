var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var miniSchema = new Schema({
  title: {type: String, required: true, maxLength: 50},
  content: {type: String, required: true, maxLength: 250},
  createdAt: {type: Date, required: true, default: Date.now},
  updatedAt: {type: Date, required: true, default: Date.now},
  userId : {type: String, required: true},
  comments : [{
    comment : {type: String, required: true, maxLength: 200},
    createdAt: {type: Date, required: true, default: Date.now},
    deleted: {type: Boolean, required: true, default: false}
    }
  ]
});

module.exports = mongoose.model('Mini', miniSchema);
