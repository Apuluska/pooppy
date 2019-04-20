const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const registerRoutes =  require('./routes');

const app = express();
app.use(bodyParser.json());
//You use urlencoded so bodyparser acepts parameters x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect("mongodb://localhost:27017/pooppyDB", {useNewUrlParser: true}, function(err) {
  if (err){
      console.log("Error no he podido conectar con la base de datos");
  }else{
      console.log("Connected to database");
  }
});

// Call routes wich are exported in routes/index.js
registerRoutes(app);


 app.listen(3000, () => console.log("Server listening"));

