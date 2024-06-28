const mongoose = require("mongoose");

const Url = process.env.MONGODB_CONNECTION_STRING;
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
