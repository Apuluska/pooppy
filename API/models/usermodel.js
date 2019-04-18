var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var userSchema = new Schema({
  _id: ObjectId,
  email: String,
  password: String,
  //favoriteBins: [{ idBin: ObjectId }]
  favoriteBins: [{ type: ObjectId, ref: 'Bin' }]
},
  { collection: 'users.json' });


const userModel = mongoose.model("users.json", userSchema);

module.exports = userModel;
