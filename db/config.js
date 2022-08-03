const mongoose = require("mongoose");

const dbConection = async () => {
  try {
    await mongoose.connect(process.env.DBCNN,{
      useNewUrlParser:true,
      useUnifiedTopology:true,
      // useCreateIndex:true, before jodia now no
      
    });
    console.log("DB Online");

  } catch (error) {
    console.log(error);
    throw new Error("Error with the conection");
  }
};

module.exports = dbConection
