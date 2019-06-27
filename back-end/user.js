const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const DataSchema = new Schema(
  { 
    name: {
      type: String,
      required: [true, 'Name field is required.']
    },
    account: {
      type: String,
      required: [true, 'Account field is required.']
    },
    password: {
      type: String,
      required: [true, 'Password field is required.']
    },
    email: {
      type: String,
      required: [true, 'Email field is required.']
    },
    content: {
      type: String
    },
    img_source: {
      type: String
    }
  }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("user", DataSchema);
