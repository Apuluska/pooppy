const { BinProvider } = require("../providers");

function binRoutes(app) {

    // Gets all the bins
    app.get("/bins", async function (req,res) {
        const bins = await BinProvider.findAll();
        res.send(bins);
    });
    
    // Gets a bin by his Id
    app.get("/bins/:id", async function (req, res) {
        let binId = req.params.id;
        const selectedBin = await BinProvider.findBinById(binId);
        res.send(selectedBin);
    });

    // Finds a bin a change its state of bags
    app.put("/bins/:id/:info", async function (req, res) {
        let binId = req.params.id;
        let binNewInfo = req.params.info;
        const selectedBin = await BinProvider.updateBin(binId, binNewInfo);
        res.send(selectedBin);
    }); 

}

module.exports = binRoutes;