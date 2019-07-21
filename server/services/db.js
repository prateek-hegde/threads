const mongoose = require("mongoose");

mongoose
  .connect(process.env.mongo, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => {
    console.log("database connected");
  })
  .catch(e => {
    console.log(e);
  });
