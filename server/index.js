const express = require("express");
const cookieSession = require("cookie-session");
const mongoose = require("mongoose");
const authRoute = require("./models/auth");
const passport = require("passport");
const passportSetup = require("./passport");
const path = require("path");
const { reset } = require("nodemon");
const { SongModel, UserInfo, LogInfo } = require("./models/songs");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());
app.use(bodyParser.json());

const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "songs",
  password: "dzytad",
  port: 5432,
});

app.use(cors());

app.use(express.json());

app.use(
  cookieSession({
    name: "session",
    keys: ["passport"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authRoute);

mongoose.connect(
  "mongodb+srv://keyin2021:keyin2021@songs.0doyt.mongodb.net/songs?retryWrites=true&w=majority"
);

app.get("/getSongs", (req, res) => {
  SongModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.get("/getSongsPg", (req, res) => {
  const sql = "SELECT * FROM vw_songs";
  pool.query(sql, [], (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result.rows);
    }
  });
});

app.post("/logData", async (req, res) => {
  const newLogItem = req.body;
  const newLogItemDb = new LogInfo(newLogItem);
  await newLogItemDb.save();
  res.json(newLogItem);
});

app.get("/getLogData", (req, res) => {
  LogInfo.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  }).sort({ create_at: -1 });
});

app.get("/getUsers", (req, res) => {
  UserInfo.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/addSong", async (req, res) => {
  const song = req.body;
  const newSong = new SongModel(song);
  await newSong.save();

  res.json(song);
});

app.post("/addUser", async (req, res) => {
  const user = req.body;
  const newUser = new UserInfo(user);
  await newUser.save();

  res.json(user);
});

app.use(
  "/static",
  express.static(path.join(__dirname, "..", "client", "build", "static"))
);

app.get("*", async (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});

app.listen(3001, () => {
  console.log("running");
});
