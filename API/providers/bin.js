const { binModel }  = require("../models");

class BinProvider{ 

  async findAll(){
      const bins =  binModel.find();
      return await bins;
  };

  async findBinById(id) {
      const bin = await binModel.findById(id);
      return bin;
  };
    
  async updateBin(id, info){
    var binChange = await binModel.findOneAndUpdate({_id:id},{$set:{bag:info}},(err, doc) => {
      if (err) {
          console.log("Something wrong when updating data!");
      }
  
      console.log("Data inserted is: " + doc);
  })
    return binChange;
  }
}

module.exports = new BinProvider;