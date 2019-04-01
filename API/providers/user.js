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
    userModel.findOne({ userName: req.body.userName }, function (err, user) {
      if (user) {
        // compare recibe 3 parametros: data (datos pasados por post),
        // hash (datos de usuario) y callback que devuelve un error y una validacion (booleano)
        bcrypt.compare(req.body.password, user.password).then(function (check) {
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
