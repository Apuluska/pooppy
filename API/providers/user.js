const { userModel } = require("../models");

const binProvider= require("./bin");

class UserProvider {

  async getFavoriteBinList(idUser) {
    let user = await userModel.findById(idUser);
    return user;
  }

  //Se crea un id nuevo cada vez que se hace un push
  async addFavoriteBin(idUser, idBin) {
    let binChange = await userModel.findByIdAndUpdate(
      idUser,
      { $push: { favoriteBins: idBin } },
      { new: true }
    );
    return binChange;
  }
  //NO FUNCIONA
  async deleteFavoriteBin(idUser, idBin) {
    let binChange = await userModel.updateOne(
      { idUser: idUser },
      { $pull: { favoriteBins: { _id: ObjectId(idBin) } } }
    );
    return binChange;

    /*let user = userModel.findById(idUser);
        user.favoriteBins.remove(idBin);
        user.save();
        return user;*/
  }
  //estas dos funciones no se han probado login y register
  async login(req, res) {
    userModel.find({email: req.body.email},(err,user)=>{
      if (err) return req.status(500).send({message: err})
      if(!user) return req.status(404).send({message: "No existe el usuario"})
      req.user= user
      req.status(200).send({
        message: "Te has logado correctamente",
        token:service.createToken(user)
      })
    })
  }
  async register(req,res) {
    const user = new userModel({
      email: body.email,
      password: body.password
    });
    return await user.save((err) => {
        if(err) res.status(500).send({
         message: `Error al crear usuario: $(err)`})
         return res.status(200).send({token: service.createToken(user)})
    });
  }

}
module.exports = new UserProvider();
