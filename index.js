require("dotenv").config();
const PORT = process.env.PORT;
const httpServer = require("./app")
httpServer.listen(PORT);
