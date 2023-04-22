const Model = require("./model");

const addMessage = (message) => {
  const myMessage = new Model(message);
  myMessage.save();
  return myMessage.id;
};

const getMessages = async (filterByUser, filterByLesson) => {
  let filter = {};
  if (filterByUser) {
    filter = { user: filterByUser };
  } else if (filterByLesson) {
    filter = { lesson: filterByLesson };
  }

  try {
    const messages = await Model.find(filter).populate("user", {
      username: true,
      name: true,
      rol: true,
    }).populate("lesson", {});
    return messages;
  } catch (error) {
    console.error(error);
  }
};

// const getMessagesWithData = async () => {
//   try {
//     const messages = await Model.find();
//     let resMessages = [];
//     for (const message of messages) {
//       const user = await userModel.findById(message.usuario_id);
//       let newMessage = {
//         _id: message._id,
//         usuario_id: message.usuario_id,
//         content: message.content,
//         createdAt: message.createdAt,
//         usuario: user,
//       };
//       resMessages.push(newMessage);
//     }
//     console.log(resMessages);
//     return resMessages;
//   } catch (error) {
//     console.error(error);
//   }
// };

const getMessage = async (id) => {
  try {
    const message = await Model.findById(id).populate("user", {
      username: true,
      name: true,
      rol: true,
    });
    return message;
  } catch (error) {
    console.error(error);
  }
};

const getMessageByUserId = async (id) => {
  try {
    const message = await Model.find({ user: id }).populate("user", {
      username: true,
      name: true,
      rol: true,
    });
    return message;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  add: addMessage,
  list: getMessages,
  // listWithData: getMessagesWithData,
  listOne: getMessage,
  listByUserId: getMessageByUserId,
};
