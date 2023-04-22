require("dotenv").config();
const Model = require("./model");

const addUser = (user) => {
  const {username} = user;

  let exist = Model.find({username: username});
  if (exist) {
    return 409; // Conflict (username already exists)
  }
  const myUser = new Model(user);
  myUser.save();
};

const getUsers = async () => {
  try {
    const users = await Model.find();
    return users;
  } catch (error) {
    console.error(error);
  }
}

const getUser = async (id) => {
    try {
        const user = await Model.findById(id);
        return user;
    } catch (error) {
        console.error(error);
    }
};      

module.exports = {
  add: addUser,
  list: getUsers,
  listOne: getUser,
};
