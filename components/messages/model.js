const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    lesson: {
        type: Schema.ObjectId,
        ref: "Lesson",
    },
    user: {
        type: Schema.ObjectId,
        ref: "User",
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: Date,
});


const model = mongoose.model("Message", messageSchema);

module.exports = model;