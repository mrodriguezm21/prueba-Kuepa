const store = require("./store");
const auth = require("../auth/controller");
const logger = require("../utils/logger");
const controller_name = "messageController";

const addUser = (user) => {
  const { username, name, password } = user;
  return new Promise(async (resolve, reject) => {
    if (!username || !name || !password) {
      console.error(logger("Faltan datos", controller_name, "ERROR"));
      return reject("Los datos son incorrectos");
    }
    const newUser = {
      username: username,
      name: name,
    };
    try {
      let resp = await store.add(newUser);
      if (resp == 409) {
        console.error(logger("El usuario ya existe", controller_name, "ERROR"));
        return reject(409, "El usuario ya existe");
      }
      resolve(newUser);
      const authUser = {
        username: resp,
        password: password,
      };
      auth.addUser(authUser);
    } catch (error) {}
  });
};

const getUsers = () => {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.list());
    } catch (error) {
      reject(500, "Error interno");
    }
  });
};

const getUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await store.listOne(id);
      if (!user) {
        reject(404, "No se encontró el usuario");
        return;
      }
      resolve(user);
    } catch (error) {
      reject(500, "Error interno");
    }
  });
};

module.exports = {
  addUser,
  getUsers,
  getUser,
};
