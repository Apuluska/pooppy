const BinProvider = require("../providers/bin");

app.get("/bins", async function(req, res) {
    const bins = BinProvider.findAll();
    console.log(JSON.stringify(bins));
    res.send(JSON.stringify(bins));
 });