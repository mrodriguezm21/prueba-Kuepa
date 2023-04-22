require("dotenv").config();
const db = require("mongoose");
const Model = require("./model");
// const userModel = require("../users/model");

const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@kuepa.df0anbl.mongodb.net/test`;
db.Promise = global.Promise;
db.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "series",
});
try {
  console.log("[db] Conectada con éxito");
} catch (error) {
  console.error("[db]", error);
}

const addMessage = (message) => {
  const myMessage = new Model(message);
  myMessage.save();
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
