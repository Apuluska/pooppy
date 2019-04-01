const { userModel } = require("../models");

const binProvider= require("./bin");

class UserProvider {
  
  async getFavoriteBinList(idUser){
    favoriteBins = [];
    var user = await userModel.findById(idUser);
    user.favoriteBins.forEach(binId => {
        bin = binProvider.findBinById(binId);
        favoriteBins.push(bin);
    });
    return favoriteBins;
}

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

  async login(req, res) {
    userModel.find({email: req.body.email},(err,user)=>{
      if (err) return res.status(500).send({message: err})
      if(!user) return res.status(200).send({message: "Usuario o clave incorrecta"})
        bcrypt.compare(req.body.password, user.password, function(err, res) {
            if(res){
                return res.status(200).send({
                    message: "Te has logado correctamente",
                    token:service.createToken(user)
                })
            }else{
                return res.status(200).send({message: "Usuario o clave incorrecta"})
            }
        });

    })
  }

  register(req,res) {
    var saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        const user = new userModel({
            email: req.body.email,
            password: hash
        });
        return  user.save((err) => {
            if(err) res.status(500).send({
                message: `Error al crear usuario: $(err)`})
            return res.status(200).send({token: service.createToken(user)})
        });
    });
  }
}
module.exports = new UserProvider();
