require("dotenv").config();
const Model = require("./model");

const addLesson = (lesson) => {
    const newLesson = new Model(lesson);
    newLesson.save();
};
const getLessons = async () => {
    try {
        const lessons = await Model.find().populate('user', {
            username: true,
            name: true,
          });
        return lessons;
    } catch (error) {
        console.error(error);
    }
};
const getLesson = async (id) => {
    try {
        const lesson = await Model.findById(id);
        return lesson;
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
  add: addLesson,
  list: getLessons,
  listOne: getLesson,
};
