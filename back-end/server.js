const mongoose = require("mongoose");
const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');

Grid.mongo = mongoose.mongo;
const User = require("./user")
const File = require("./file")


const API_PORT = 3002;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const dbRoute = "mongodb://oomtball:123@webfinal-shard-00-00-rwgwr.mongodb.net:27017,webfinal-shard-00-01-rwgwr.mongodb.net:27017,webfinal-shard-00-02-rwgwr.mongodb.net:27017/test?ssl=true&replicaSet=webFinal-shard-0&authSource=admin&retryWrites=true&w=majority";

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(methodOverride('_method'))
router.use(logger("dev"));
app.set('view engine', 'ejs')
// connects our back end code with the database
//const conn = mongoose.createConnection(dbRoute);
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let conn = mongoose.connection;
let gfs;
let temp_user_account = "";
let temp_file_id = "";
let temp_file_content = "";
let temp_file_title = "";
conn.once("open", () => {
  console.log("connected to the database")
  gfs = Grid(conn.db, mongoose.mongo);  
  gfs.collection('uploads');
});

// checks if connection with the database is successful
conn.on("error", console.error.bind(console, "MongoDB connection error:"));

const storage = new GridFsStorage({
  url: dbRoute,
  filename: (req, file, cb) => {
    // The way you want to store your file in database
    cb(null, file.originalname); 
  },

  // Additional Meta-data that you want to store
  metadata: function(req, file, cb) {
    cb(null, { originalname: file.originalname });
  },
  root: 'ctFiles' // Root collection name
});

const upload = multer({ storage })

// all POST ------------------------------------------------------
// upload file
router.post('/upload/:user_account/:file_id/:file_content/:file_title', upload.single('file'), (req, res) => {
  temp_user_account = req.params.user_account;
  temp_file_id = req.params.file_id;
  temp_file_content = req.params.file_content;
  temp_file_title = req.params.file_title;
  return res.json({ success: true, file:req.file });
});

// register
router.post('/register', (req, res) => {
  let data = new User();
  const { name, account, password, email } = req.body;

  if (!account || !name || !password || !email) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }

  data.name = name;
  data.account = account;
  data.password = password;
  data.email = email;
  data.content = "";
  data.img_source = "";
  data.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

//updateProfile
router.post("/updateProfile", (req, res) => {
  const { user, update } = req.body;
  User.findOneAndUpdate({ account: user }, update, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// all GET ---------------------------------------------------------
// get all users
router.get("/getUser", (req, res) => {
  User.find((err, data) => {
    //console.log(req.body);
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// get one user
router.get("/getProfile/:user", (req, res) => {
  // console.log(req);
  User.findOne({ account: req.params.user }, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// get all file
router.get("/getFile/:user_account", (req, res) => {
  gfs.collection('ctFiles'); //set collection name to lookup into

    /** First check if file exists */
    gfs.files.find({user_account: req.params.user_account}).toArray(function(err, files){
        if(!files || files.length === 0){
            return res.status(404).json({
                responseCode: 1,
                responseMessage: "error"
            });
        }
        return res.json({success: true, data:files});
    });
});
//get one file
router.get("/getFile/:user_account/:id", (req, res) => {
  // File.findOne({ user_account: req.params.user, file_id: req.params.id }, (err, data) => {
  //   //console.log(req.body);
  //   if (err) return res.json({ success: false, error: err });
  //   return res.json({ success: true, data: data });
  // });
  gfs.collection('ctFiles'); //set collection name to lookup into

    /** First check if file exists */
    console.log(req.params.user_account)
    console.log(req.params.id)
    gfs.files.find({user_account: req.params.user_account, file_id: req.params.id}).toArray(function(err, files){
      if(!files || files.length === 0){
          return res.status(404).json({
              responseCode: 1,
              responseMessage: "error"
          });
      }
      return res.json({success: true, data:files});
  });
});

// get a file from DB
router.get("/gethihi/:filename", (req, res) => {
  gfs.collection('ctFiles'); //set collection name to lookup into

    /** First check if file exists */
    gfs.files.find({filename: req.params.filename}).toArray(function(err, files){
        if(!files || files.length === 0){
            return res.status(404).json({
                responseCode: 1,
                responseMessage: "error"
            });
        }
        // create read stream
        var readstream = gfs.createReadStream({
            filename: files[0].filename,
            root: "ctFiles"
        });
        // set the proper content type 
        res.set('Content-Type', files[0].contentType)
        // Return response
        return readstream.pipe(res);
    });
})

router.get("/downloadFile/:user_account/:file_id", (req, res) => {
  gfs.collection('ctFiles'); //set collection name to lookup into

    /** First check if file exists */
    console.log(req.params.file_id)
    console.log(req.params.user_account)
    gfs.files.find({file_id: req.params.file_id, user_account: req.params.user_account}).toArray(function(err, files){
        if(!files || files.length === 0){
            return res.status(404).json({
                responseCode: 1,
                responseMessage: "error"
            });
        }
        console.log(files[0].filename)
        // create read stream
        var readstream = gfs.createReadStream({
            filename: files[0].filename,
            root: "ctFiles"
        });
        // set the proper content type 
        res.set('Content-Type', files[0].contentType);
        // Return response
        return readstream.pipe(res);
    });
})

// handshake
router.get("/handshake", (req, res) => {
  const request = req.body;
  return res.json({ success:true, });
})

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));