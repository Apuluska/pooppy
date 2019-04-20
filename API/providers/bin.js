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
  async findByUser(arrayBin){
    console.log("la lista de binid es: " + arrayBin)
    const bins =  await binModel.find({_id: arrayBin});
    await console.log("la lista de bins por usuario es: " + bins);
    return await bins;
};
}

module.exports = new BinProvider;