const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const DataSchema = new Schema(
  { 
    upload_time: String,
    file_title: String,  
    file_id: String,
    file_name: String,  
    file_description: String,  
    user_account: String,  
  }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("file", DataSchema);
