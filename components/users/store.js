const Model = require("./model");

const addUser = async (user) => {
  const {username} = user;

  let exist = await Model.findOne({username: username});
  if (exist) {
    return 409; // Conflict (username already exists)
  }
  const myUser = new Model(user);
  myUser.save();
  return myUser.id;
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
