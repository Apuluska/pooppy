var mongoose = require('mongoose');
  var {Schema}  = mongoose;
  var ObjectId = mongoose.Schema.Types.ObjectId;

  var binSchema = new Schema({
    idbin:  ObjectId,
    bag: Boolean,
    address: [{
      addressName: String,
    	lat: Number,
    	leng: Number
    }]
},
{ collection : 'bin' });

const binModel = mongoose.model("bin", binSchema);
module.exports = binModel;
