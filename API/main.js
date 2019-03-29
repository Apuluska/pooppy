/* const binModel = require("././models/binmodel"); */
const userModel= require("././models/usermodel");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const binProvider= require("././providers/bin")
const userProvider= require("././providers/user")

const app= express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));//Se usa esta linea para que bodyparser acepte parametros x-www-form-urlencoded

mongoose.connect("mongodb://localhost:27017/pooppyDB", {useNewUrlParser: true}, function(err) {
  if (err){
      console.log("Error");
  }else{
      console.log("Connected to database : ");
  }
});

//userProvider.favoriteBinList("5c9a52dd5f02671f443fb995","5c9a1c36318e3d1e486f7320");

 app.listen(3000, () => console.log("Server listening"));


 app.get("/bins", async function(req, res) {
  const bins = await binProvider.findAll();
  console.log(bins);
  res.send(bins);
});

app.get("/bins/:id", async function(req, res) {
  let binId = req.params.id;
  const selectedBin = await binProvider.findBinById(binId);
  res.send(selectedBin);
});

app.get("/bins/:id", async function(req, res) {
  let binId = req.params.id;
  const selectedBin = await binProvider.findBinById(binId);
  res.send(selectedBin);
});

//incompleto. No esta actualizando el valor de bags en la base de datos
app.get("/bins/:id/:info", async function(req, res) {
  let binId = req.params.id;
  let binNewInfo = req.params.info == "true";
  const selectedBin = await binProvider.updateBin(binId, binNewInfo);
  res.send(selectedBin);
});

app.get("/user/:id/favorite_bins", async function(req, res) {
  let userId = req.params.id;
  const favoriteBins = await userProvider.getFavoriteBinList(userId);
  res.send(favoriteBins);
});
//De aqui para abajo no he pobrado con posman
app.post("/user/:id_user/favorite_bins", async function(req, res) {
  let userId = req.params.id_user;
  let binId = req.body.id_bin;
  const user = await userProvider.addFavoriteBin(userId,binId);
  console.log(user);
  res.send(user);
});

app.delete("/user/:id_user/favorite_bins/", async function(req, res) {
  let userId = req.params.id_user;
  let binId = req.body.id_bin;
  const user = await userProvider.deleteFavoriteBin(userId,binId);
  res.send(user);
});