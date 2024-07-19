const mongoose = require("mongoose");

const Url = process.env.MONGODB_CONNECTION_STRING || "mongodb+srv://umerfarooqdev:hireon123713@cluster0.sy63jcm.mongodb.net/";
const dbConnect = async () => {
  try {
    // process.env.MONGODB_CONNECTION_STRING
    mongoose.set("strictQuery", false);

    const conn = await mongoose.connect(Url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Database connected to host: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

module.exports = dbConnect;
