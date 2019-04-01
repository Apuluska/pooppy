const { userModel } = require("../models");

const binProvider = require("./bin");

class UserProvider {

  async getFavoriteBinList(userId) {
    var favoriteBinsInfo = [];
    let user = await userModel.findById(userId);
    user.favoriteBins.map(async (binId) => {
      let binInfo = binProvider.findBinById(binId);
      favoriteBinsInfo.push(binInfo);
      return favoriteBinsInfo;
    });
    const resolvedFinalArray = await Promise.all(favoriteBinsInfo); 
    return resolvedFinalArray;
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
