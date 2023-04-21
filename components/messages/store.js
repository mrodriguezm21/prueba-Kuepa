require("dotenv").config();
const db = require("mongoose");
const Model = require("./model");

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

const getMessages = async () => {
  try {
    const messages = await Model.find();
    return messages;
  } catch (error) {
    console.error(error);
  }
};

const getMessage = async (id) => {
  try {
    const message = await Model.findById(id);
    return message;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  add: addMessage,
  list: getMessages,
  listOne: getMessage,
};
