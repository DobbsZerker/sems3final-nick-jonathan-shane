const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({
  song_name: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  album: {
    type: String,
    required: true,
  },
  song_length: {
    type: Number,
    required: true,
  },
});

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  loggedin: {
    type: Boolean,
    required: true,
  },
});

const LogSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  searchTerm: {
    type: String,
    required: true,
  },
  create_at: {
    type: Date,
    required: true,
  },
});

const SongModel = mongoose.model("newSongs", SongSchema);
const UserInfo = mongoose.model("Users", UserSchema);
const LogInfo = mongoose.model("Log", LogSchema);

module.exports = {
  SongModel,
  UserInfo,
  LogInfo,
};
