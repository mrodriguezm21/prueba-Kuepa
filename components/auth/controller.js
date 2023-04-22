const store = require("./store");
const logger = require("../utils/logger");
const controller_name = "messageController";

const addUser = (user) => {
  const { username, password } = user;
  return new Promise((resolve, reject) => {
    if (!username || !password) {
      console.error(logger("Faltan datos", controller_name, "ERROR"));
      return reject(400,"Los datos son incorrectos");
    }
    const newUser = {
      username: username,
      password: password,
    };
    store.add(newUser);
    resolve(newUser);
  })
}

const getAuth = async (user) => {
  const { username, password } = user;

  return new Promise( async (resolve, reject) => {
    if (!username || !password) {
      console.error(logger("Faltan datos", controller_name, "ERROR"));
      return reject(400,"Los datos son incorrectos");
    }
    try {
      const auth = await store.listOne(user);
      if (auth === 400) {
        return reject(400,"Los datos son incorrectos");
      }
      resolve(auth);
    } catch (error) {
      console.error(error);
    }

  });

};

module.exports = {
  addUser,
  getAuth,
};
