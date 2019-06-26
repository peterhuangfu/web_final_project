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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'))
app.use(logger("dev"));
app.set('view engine', 'ejs')
// connects our back end code with the database
//const conn = mongoose.createConnection(dbRoute);
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let temp;
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

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//   cb(null, 'public')
// },
//   filename: function (req, file, cb) {
//   cb(null, Date.now() + '-' +file.originalname )
// }
// })

const storage = new GridFsStorage({
  url: dbRoute,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.ramdonBytes(16, (err, buf) => {
        if (err){
          return reject(err);
        }
        //const filename = buf.toSring('hex') + path.extname(file.originalname);
        const filename = abc;
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      })
    })
  }
});
var upload = multer({ storage })

router.get('/', (req, res) => {
  res.render('index');
})

router.post('/upload', upload.single('file'),(req, res) => {
  return res.json({ success: true, file: req.file});
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
// router.get("/getFile", (req, res) => {
//   File.find((err, data) => {
//     //console.log(req.body);
//     if (err) return res.json({ success: false, error: err });
//     return res.json({ success: true, data: data });
//   });
// });
// get one file
// router.get("/getFile/:id", (req, res) => {
//   File.findOne({file_id: req.params.id}, (err, data) => {
//     //console.log(req.body);
//     if (err) return res.json({ success: false, error: err });
//     return res.json({ success: true, data: data });
//   });
// });



router.get("/getFile/:filename", (req, res) => {
  gfs.files.findOne({filename: req.params.filename}, (err, file => {
    if (!file || file.length === 0){
      return res.status(404).json({
        err:  'No files exist'
      })
    }
  }))
})

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