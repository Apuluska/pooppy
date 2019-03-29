const userModel= require("../models/usermodel");
const binProvider= require("./bin");

class UserProvider{
    async getFavoriteBinList(idUser){
        favoriteBins = [];
        var user = await userModel.findById(idUser);
        user.favoriteBins.forEach(binId => {
            bin = binProvider.findBinById(binId);
            favoriteBins.push(bin);
        });
        return favoriteBins;
    }

    //Se crea un id nuevo cada vez que se hace un push
    async addFavoriteBin(idUser, idBin){
        var binChange = await userModel.findByIdAndUpdate(idUser,{$push: {favoriteBins: idBin}}, {new: true});
        return binChange;
    }

    async deleteFavoriteBin(idUser, idBin){
        var binChange = await userModel.updateOne( {idUser: idUser}, { $pull: {favoriteBins: {_id:ObjectId(idBin)} }});
        return binChange;

        /*var user = userModel.findById(idUser);
        user.favoriteBins.remove(idBin);
        user.save();
        return user;*/
    }
   async login(){

   }

   async register(){

   }
}
module.exports = new UserProvider();