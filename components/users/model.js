const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,}
    ,
  name: {
    type: String,
    required: true,
    },
  rol: Number,
});

const model = mongoose.model("User", userSchema);

module.exports = model;
