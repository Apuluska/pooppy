const binProvider = require("../providers/bin");

function binRoutes(app) {

    app.get("/bins", async function (req, res) {
        const bins = await binProvider.findAll();
        console.log(bins);
        res.send(bins);
    });

    app.get("/bins/:id", async function (req, res) {
        let binId = req.params.id;
        const selectedBin = await binProvider.findBinById(binId);
        res.send(selectedBin);
    });

    //incompleto. No esta actualizando el valor de bags en la base de datos
    app.get("/bins/:id/:info", async function (req, res) {
        let binId = req.params.id;
        let binNewInfo = req.params.info == "true";
        const selectedBin = await binProvider.updateBin(binId, binNewInfo);
        res.send(selectedBin);
    });

}

module.exports = binRoutes;