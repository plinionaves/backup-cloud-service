var mongoose = require('mongoose');

module.exports = function() {

  var schema = mongoose.Schema({
    originalName: {
      type: String,
      required: true,
      index: {
        unique: true
      }
    },
    path : {
      type: String,
      required: true
    },
    size: {
      type: Number
    },
    date: {
      type: Date,
      default: Date.now
    }
  });

  return mongoose.model('File', schema);

}
