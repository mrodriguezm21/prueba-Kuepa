const store = require("./store");
const logger = require("../utils/logger");

const controller_name = "messageController";

const addMessage = (message) => {
  const { user, content } = message;

  return new Promise((resolve, reject) => {
    if (!user || !content) {
      console.error(logger("Faltan datos", controller_name, "ERROR"));
      return reject("Los datos son incorrectos");
    }
    const newMessage = {
      user: user,
      content: content,
      createdAt: new Date(),
    };
    store.add(newMessage);
    resolve(newMessage);
  });
};

const getMessages = (filter) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.list(filter));
    } catch (error) {
      reject(500, "Error interno");
    }
  });
};

// const getMessagesWithData = () => {
//   return new Promise((resolve, reject) => {
//     try {
//       resolve(store.listWithData());
//     } catch (error) {
//       reject(500, "Error interno");
//     }
//   });
// };

const getMessage = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const message = await store.listOne(id);
      if (!message) {
        reject(404, "No se encontró el mensaje");
        return;
      }
      resolve(message);
    } catch (error) {
      reject(500, "Error interno");
    }
  });
};

const getMessageByUserId = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const message = await store.listByUserId(id);
      if (!message) {
        reject(404, "No se encontró el mensaje");
        return;
      }
      resolve(message);
    } catch (error) {
      reject(500, "Error interno");
    }
  });
};
module.exports = {
  addMessage,
  getMessages,
  getMessage,
  getMessageByUserId,
  // getMessagesWithData,
};
