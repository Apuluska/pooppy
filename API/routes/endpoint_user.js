const { UserProvider }  = require("../providers");

function userRoutes(app) {

    // Finds all the favorite bins that a user has 
    app.get("/user/:id/favorite_bins", async function (req, res) {
        let userId = req.params.id;
        const favoriteBins = await UserProvider.getFavoriteBinList(userId);
        res.send(favoriteBins);
    });
    
    //De aqui para abajo no he pobrado con posman
    app.post("/user/:id_user/favorite_bins", async function (req, res) {
        let userId = req.params.id_user;
        let binId = req.body.id_bin;
        const user = await UserProvider.addFavoriteBin(userId, binId);
        res.send(user);
    });

    app.delete("/user/:id_user/favorite_bins/", async function (req, res) {
        let userId = req.params.id_user;
        let binId = req.body.id_bin;
        const user = await UserProvider.deleteFavoriteBin(userId, binId);
        res.send(user);
    });

}

module.exports = userRoutes;