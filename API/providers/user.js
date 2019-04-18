const bcrypt = require('bcrypt');

const { userModel } = require("../models");

const binProvider = require("./bin");

var service = require('../services/jwt');

class UserProvider {

  async getFavoriteBinList(userId) {
    var favoriteBinsInfo = [];
    console.log("El usuario es: " + userId);
    let user = await userModel.findById(userId);
     await console.log("user await");
    await user.favoriteBins.map(async (binId) => {
      let binInfo = binProvider.findBinById(binId);
      favoriteBinsInfo.push(binInfo);
      return favoriteBinsInfo;
    });
    await console.log("user despues de await");
    const resolvedFinalArray = await Promise.all(favoriteBinsInfo);
    return resolvedFinalArray;
  }

  async getUser () {
    user
  }

  async addFavoriteBin(userId, idBin) {
    let binChange = await userModel.findByIdAndUpdate(
      userId,
      { $push: { favoriteBins: idBin } },
      { new: true }
    );
    return binChange;
  }

  async deleteFavoriteBin(idUser, idBin) {
    let binChange = await userModel.update(
      { _id: idUser },
      { $pull: { favoriteBins: { $in: idBin } } }
    );
    return binChange;
  }

  login(req, res) {
    userModel.find({ email: req.body.email }, (err, user) => {
      if (err) return res.status(500).send({ message: err })
      bcrypt.compare(req.body.password, user[0].password, function (err, check) {
        console.log(user[0].password);
        if (check) {
          return res.status(200).send({
            message: "Te has logado correctamente",
            token: service.createToken(user)
          })
        } else {
          return res.status(200).send({ message: "Usuario o clave incorrecta" })
        }
      });
    })
  }

  async register(req, res) {
    if(userExists(req.body.email)){
      res.status(200).send({message: 'Usuario ya existe'})
  }
    var saltRounds = 10;
    await bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
      const user = new userModel({
        email: req.body.email,
        password: hash
      });

      await user.save((err) => {
        if (err) res.status(500).send({
          message: `Error al crear usuario: $(err)`
        })
        res.status(200).send({ token: service.createToken(user) })
      });
    
    });
  }

  userExists(userEmail){
    userModel.find({email: userEmail}, function(err, user){
        if(user.length){
            return true;
        }else{
            return false;
        }
    })
}
}
module.exports = new UserProvider();
