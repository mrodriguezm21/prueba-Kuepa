const store = require("./store");

const addMessage = (message) => {
  const { usuario, content } = message;

  return new Promise((resolve, reject) => {
    if (!usuario || !content) {
      console.error("[messageController] Datos incompletos");
      return reject("Los datos son incorrectos");
    }
    const newMessage = {
      usuario: usuario,
      content: content,
      createdAt: new Date(),
    };
    store.add(newMessage);
    resolve(newMessage);
  });
}

const getMessages= () => {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.list());
    } catch (error) {
      reject(500, "Error interno");
    }
  });
}

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
}

module.exports = {
  addMessage,
  getMessages,
  getMessage,
};