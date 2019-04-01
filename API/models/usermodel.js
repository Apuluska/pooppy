var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var userSchema = new Schema({
  idUser: ObjectId,
  email: String,
  password: String,
  //favoriteBins: [{ idBin: ObjectId }]
  favoriteBins: [{ type: ObjectId, ref: 'Bin' }]
},
  { collection: 'user' });


const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
