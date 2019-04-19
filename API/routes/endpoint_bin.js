const { BinProvider } = require("../providers");

function binRoutes(app) {

    // Gets all the bins
    app.get("/bins", async function (req, res) {
        const bins = await BinProvider.findAll();
        await res.send(bins);
    });

    app.post("/binUser", async function (req, res) {
        const binId = req.body;
        console.log("el cuerpo de la llama es:" + binId);
        const binsUser = await BinProvider.findByUser(binId);
        await res.send(binsUser);
    });

    // Gets the info of one bin by his Id
    app.get("/bins/:id", async function (req, res) {
        let binId = req.params.id;
        const selectedBin = await BinProvider.findBinById(binId);
        res.send(selectedBin);
    });

    // Finds a bin a change its state of bags
    app.put("/bins/bags", async function (req, res) {
        let binId = req.body.id;
        let binNewInfo = req.body.info;
        const selectedBin = await BinProvider.updateBin(binId, binNewInfo);
        res.send(selectedBin);
    });

}

module.exports = binRoutes;