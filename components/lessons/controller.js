const store = require("./store");
const logger = require("../utils/logger");
const controller_name = "messageController";

const addLesson = (lesson) => {
  const { user, subject } = lesson;
  return new Promise((resolve, reject) => {
    if (!user || !subject) {
      console.error(logger("Faltan datos", controller_name, "ERROR"));
      return reject("Los datos son incorrectos");
    }
    const newLesson = {
      user: user,
      subject: subject,
    };
    store.add(newLesson);
    resolve(newLesson);
  });
};

const getLessons = () => {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.list());
    } catch (error) {
      reject(500, "Error interno");
    }
  });
};

const getLesson = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const lesson = await store.listOne(id);
      if (!lesson) {
        reject(404, "No se encontró la lección");
        return;
      }
      resolve(lesson);
    } catch (error) {
      reject(500, "Error interno");
    }
  });
};


module.exports = {
  addLesson,
  getLessons,
  getLesson,
};
