const db = require("mongoose");
const config = require("./config");

db.Promise = global.Promise;

async function connect(url) {
  await db.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: config.dbName,
  });
  console.log("[db] Conectada con éxito");
}

module.exports = connect;
