const Model = require("./model");
const { sign } = require("../../auth/index");
const bcrypt  = require("bcrypt");

const addUser =  async (user) => {
  const {password } = user;
  user.password = await bcrypt.hash(password, 5);
  const myUser = new Model(user);
  return myUser.save();
};
const getAuth = async (user) => {
  const { username, password } = user;
  console.log(user);
  try {
    const auth = await Model.findOne({ username: username });
    console.log(auth);
    const valid = await bcrypt.compare(password, auth.password);
    if (!valid) {
      return 400; // Invalid information
    }
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
