const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const lessonSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: "User",
  },
  subject: {
    type: String,
    required: true,
  },
});

const model = mongoose.model("Lesson", lessonSchema);

module.exports = model;
