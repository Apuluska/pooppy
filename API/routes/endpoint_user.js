const userProvider = require("../providers/bin");

function userRoutes(app) {

    app.get("/user/:id/favorite_bins", async function (req, res) {
        let userId = req.params.id;
        const favoriteBins = await userProvider.getFavoriteBinList(userId);
        res.send(favoriteBins);
    });
    
    //De aqui para abajo no he pobrado con posman
    app.post("/user/:id_user/favorite_bins", async function (req, res) {
        let userId = req.params.id_user;
        let binId = req.body.id_bin;
        const user = await userProvider.addFavoriteBin(userId, binId);
        console.log(user);
        res.send(user);
    });

    app.delete("/user/:id_user/favorite_bins/", async function (req, res) {
        let userId = req.params.id_user;
        let binId = req.body.id_bin;
        const user = await userProvider.deleteFavoriteBin(userId, binId);
        res.send(user);
    });

}

module.exports = userRoutes;