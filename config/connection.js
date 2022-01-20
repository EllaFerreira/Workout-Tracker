const { connect, connection } = require("mongoose");
const { config } = require("dotenv");

module.exports = () => {
  config({
    path: __dirname + "/../.env",
  }); //invoking the dotenv config here
  const uri = process.env.MONGODB_URI;

  // console.log("uri is", uri);
  connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
    .then(() => {
      console.log("Connection established with MongoDB");
    })
    .catch((error) => console.error(error.message));

  connection.on("connected", () => {
    console.log("Mongoose connected to DB Cluster");
  });

  connection.on("error", (error) => {
    console.error(error.message);
  });

  connection.on("disconnected", () => {
    console.log("Mongoose Disconnected");
  });

  process.on("SIGINT", () => {
    connection.close(() => {
      console.log("Mongoose connection closed on Application Timeout");
      process.exit(0);
    });
  });
};
