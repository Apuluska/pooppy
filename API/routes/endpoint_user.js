const { UserProvider } = require("../providers");

function userRoutes(app) {

    // Gets all the info of the favorite bins that a user has 
    app.get("/user/:id/favorite_bins", async function (req, res) {
        let userId = req.params.id;
        const favoriteBins = await UserProvider.getFavoriteBinList(userId);
        res.send(favoriteBins);
    });

    // Add the selected bin into the favorite bin list
    app.post("/user/favoritebins/add", async function (req, res) {
        let id_user = req.body.id_user;
        let id_bin = req.body.id_bin;
        const user = await UserProvider.addFavoriteBin(id_user, id_bin);
        res.send(user);
    });

    // Remove the selected bin in the user favorite bin list
    app.put("/user/favoritebins/update", async function (req, res) {
        let id_user = req.body.id_user;
        let id_bin = req.body.id_bin;
        console.log(id_user);
        console.log(id_bin);
        const user = await UserProvider.deleteFavoriteBin(id_user, id_bin);
   
        res.send(user);
    });

    app.post("/user/login", async function (req, res) {
        await UserProvider.login(req,res);
    });

    app.post("/user/register", async function (req, res) {
        await UserProvider.register(req,res);
    });

}

module.exports = userRoutes;