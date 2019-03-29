const userModel= require("../models");

const binProvider= require("./bin");

class UserProvider {
    
  async getFavoriteBinList(idUser) {
    favoriteBins = [];
    var user = await userModel.findById(idUser);
    user.favoriteBins.forEach(binId => {
      bin = binProvider.findBinById(binId);
      favoriteBins.push(bin);
    });
    return favoriteBins;
  }

  //Se crea un id nuevo cada vez que se hace un push
  async addFavoriteBin(idUser, idBin) {
    var binChange = await userModel.findByIdAndUpdate(
      idUser,
      { $push: { favoriteBins: idBin } },
      { new: true }
    );
    return binChange;
  }
  //NO FUNCIONA
  async deleteFavoriteBin(idUser, idBin) {
    var binChange = await userModel.updateOne(
      { idUser: idUser },
      { $pull: { favoriteBins: { _id: ObjectId(idBin) } } }
    );
    return binChange;

    /*var user = userModel.findById(idUser);
        user.favoriteBins.remove(idBin);
        user.save();
        return user;*/
  }
  async login(req, res) {
    userModel.findOne({ userName: req.body.userName }, function(err, user) {
      if (user) {
        // compare recibe 3 parametros: data (datos pasados por post),
        // hash (datos de usuario) y callback que devuelve un error y una validacion (booleano)
        bcrypt.compare(req.body.password, user.password).then(function(check) {
          // 2: si coincide la contraseña con la que está en base de datos
          if (check) {
            console.log("TOKEN");
            // aqui generaremos el token con jwt
            // se está haciendo por una función externa pero se podría meter el código directamente
            // al estar en una función puedes usarlo en varios controladores
            // el token se guardaré en el localstorage del front
            // No hay que mandar el token al header, se hace automático
            console.log(jwt.createToken(user));
          } else {
            // mandamos 400 porque es error del usuario
            return "Contraseña incorrecta";
          }
        });
      }
    });
  }
  async register() {
    const user = new userModel({
      email: body.email,
      password: body.password
    });
    return await user.save();
  }
}
module.exports = new UserProvider();
