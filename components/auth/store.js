const Model = require("./model");
const { sign } = require("../../auth/index");

const addUser = (user) => {
  const myUser = new Model(user);
  return myUser.save();
};
const getAuth = async (user) => {
  const { username, password } = user;
  try {
    const auth = await Model.findOne({ username: username });
    if (password !== auth.password) {
      return 400; // Invalid information
    }
    //TODO: Generar token
    const token = sign({ username: username, password: password });
    return token;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  add: addUser,
  listOne: getAuth,
};
