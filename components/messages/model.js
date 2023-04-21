const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    usuario: String,
    content: String,
    createdAt: Date,
});


const model = mongoose.model("Message", messageSchema);

module.exports = model;