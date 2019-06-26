const mongoose = require("mongoose");
const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
let multer = require('multer');
let GridFsStorage = require('multer-gridfs-storage');
let Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
const User = require("./user")
const File = require("./file")


const API_PORT = 3002;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const dbRoute = "mongodb+srv://oomtball:123@webfinal-rwgwr.mongodb.net/test?retryWrites=true&w=majority";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));
// connects our back end code with the database
//const conn = mongoose.createConnection(dbRoute);
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let conn = mongoose.connection;
let gfs;
conn.once("open", () => {
  console.log("connected to the database")
  gfs = Grid(conn.db, mongoose.mongo);  
  gfs.collection('uploads');
});

// checks if connection with the database is successful
conn.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, 'public')
},
  filename: function (req, file, cb) {
  cb(null, Date.now() + '-' +file.originalname )
}
})

// const storage = new GridFsStorage({
//   url: dbRoute,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//         const filename = file.originalname;
//         const fileInfo = {
//           filename: filename,
//           bucketName: 'uploads'
//         };
//         resolve(fileInfo);
//     });
//   }
// });
var upload = multer({ storage: storage })
router.post('/uploadFile', upload.single('file'),(req, res) => {
    //console.log(req.body);
  // upload(req, res, function (err) {
  //        if (err instanceof multer.MulterError) {
  //            return res.status(500).json(err)
  //        } else if (err) {
  //            return res.status(500).json(err)
  //        }
  //   return res.status(200).send(req.file)
  	return res.json({ success: true });
  // })

});

// this is our get method
// get all user
router.get("/getUser", (req, res) => {
  User.find((err, data) => {
    //console.log(req.body);
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});
//get all file
router.get("/getFile", (req, res) => {
  File.find((err, data) => {
    //console.log(req.body);
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});
// get one file
router.get("/getFile/:id", (req, res) => {
  File.findOne({file_id: req.params.id}, (err, data) => {
    //console.log(req.body);
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// this is our update method
router.post("/updateUser", (req, res) => {
  const { user, update } = req.body;
  User.findOneAndUpdate({user}, update, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this is our delete method
// this method removes existing data in our database
// router.delete("/deleteData", (req, res) => {
//   const { name } = req.body;
//   Draw_used.findOneAndDelete(name, err => {
//     if (err) return res.send(err);
//     return res.json({ success: true });
//   });
// });

// this is our create methid
// this method adds new data in our database
router.post("/putUser", (req, res) => {
  let data = new User();

  const { account, password } = req.body;

  if (!account) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  data.account = account;
  data.password = password;
  data.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));