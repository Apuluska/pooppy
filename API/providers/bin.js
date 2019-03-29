const binModel  = require("../models/binmodel");

class BinProvider{ 

  async findAll(){
      const bins = await binModel.find();
      return bins;
  };

  async findBinById(id) {
      const bin = await binModel.findById(id);
      return bin;
  };
    
  async updateBin(id, info){
    var binChange= await binModel.findOneAndUpdate({id:id},{$set:{bag:info}}, {new: true},(err, doc) => {
      if (err) {
          console.log("Something wrong when updating data!");
      }
  
      console.log("hola" + doc);
  })
    return binChange;
  }
}

module.exports = new BinProvider;