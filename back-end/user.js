const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const DataSchema = new Schema(
  { 
    name: String,
    account: String,
    password: String,  
    email: String,
    content: String,
    img_source: String

  }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("user", DataSchema);
