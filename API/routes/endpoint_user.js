const { UserProvider } = require("../providers");

function userRoutes(app) {

    // Gets all the info of the favorite bins that a user has 
    app.get("/user/:id/favorite_bins", async function (req, res) {
        let userId = req.params.id;
        const favoriteBins = await UserProvider.getFavoriteBinList(userId);
        res.send(favoriteBins);
    });

    // Add the selected bin into the favorite bin list
    app.post("/user/:id_user/favorite_bins", async function (req, res) {
        let userId = req.params.id_user;
        let binId = req.body.id_bin;
        const user = await UserProvider.addFavoriteBin(userId, binId);
        res.send(user);
    });

    // Remove the selected bin in the user favorite bin list
    app.put("/user/:id_user/favorite_bins/", async function (req, res) {
        let userId = req.params.id_user;
        let binId = req.body.id_bin;
        const user = await UserProvider.deleteFavoriteBin(userId, binId);
        res.send(user);
    });

    app.post("/user/login", async function (req, res) {
        let userEmail = req.body.id_bin;
        let userPassword = req.body.id_bin;
        const user = await UserProvider.login(userEmail, userPassword);
        res.send(user);
    });

    app.post("/user/register", async function (req, res) {
        let userEmail = req.body.id_bin;
        let userPassword = req.body.id_bin;
        const user = await UserProvider.register(userEmail, userPassword);
        res.send(user);
    });

}

module.exports = userRoutes;