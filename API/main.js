/* const binModel = require("././models/binmodel"); */
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());
//You use urlencoded so bodyparser acepts parameters x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/pooppyDB", {useNewUrlParser: true}, function(err) {
  if (err){
      console.log("Error");
  }else{
      console.log("Connected to database : ");
  }
});

// Call routes wich are exported in routes/index.js
registerRoutes(app);


 app.listen(3000, () => console.log("Server listening"));

