const restify = require("restify");
const mongoose = require("mongoose");
const config = require("./config/config.js");
const colors = require("colors");

const server = restify.createServer();

// Middleware
server.use(restify.plugins.bodyParser());

server.listen(config.PORT, () => {
  mongoose.set("useFindAndModify", false);
  mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", () => {
  require("./routes/customers")(server);
  require("./routes/users")(server);
  console.log(
    `Server started on port `.bold.green +
      `${config.PORT}`.underline.bold.yellow
  );
});
