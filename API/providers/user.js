const bcrypt = require('bcrypt');

const { userModel } = require("../models");

const binProvider = require("./bin");

var service = require('../services/jwt');

class UserProvider {

  async getFavoriteBinList(userId) {
    var favoriteBinsInfo = [];
    let binList = [];
    let resolvedFinalArray;
    var infoUser = await userModel.findById(userId, (error, usuario) => {
      var info = usuario.favoriteBins.map((binId) => {
        let binInfo = binProvider.findBinById(binId);
        favoriteBinsInfo.push(binInfo);
        return favoriteBinsInfo;
      });
      resolvedFinalArray = Promise.all(info);
      return resolvedFinalArray;
    });
    await infoUser.favoriteBins.forEach(element => {
      if (element != null) {
        binList.push(element);
      }
    });
/*     await console.log(binList);
 */    return await binList;
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
    userModel.find({ email: req.body.user.email }, (err, user) => {
      console.log('llega'+user);
      if (err) return res.status(500).send({ message: err })
      if (user.length === 0 || user == null) {
        return res.status(200).send(new userModel());
      } else {
        /* return res.status(200).send(user[0]); */
        ///TODO REVISAR
        console.log('pass desde el front: ' + req.body.user.password);
        console.log('pass desde la bbdd: ' + user[0].password);
        bcrypt.compare(req.body.user.password, user[0].password, function (err, check) {
          console.log("entra aqui eerr" + err);
          console.log("entra aqui2" + check);

          if (check) {
            return res.status(200).send({
              message: "Te has logado correctamente",
              token: service.createToken(user)
            })
          } else {
            return res.status(200).send({ message: "Usuario o clave incorrecta" })
          }
        });
          return null;
          /*               
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
        }) */
      }
    })
  }

      async register(req, res) {
        if (userExists(req.body.email)) {
          res.status(200).send({ message: 'Usuario ya existe' })
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

      userExists(userEmail) {
        userModel.find({ email: userEmail }, function (err, user) {
          if (user.length) {
            return true;
          } else {
            return false;
          }
        })
      }
    }
module.exports = new UserProvider();
