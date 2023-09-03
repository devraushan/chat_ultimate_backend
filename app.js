const express = require('express')
const cors = require("cors")
const { createServer } = require("http")
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const registerChatHandler = require("./src/pipe/socketroom");
const dbconnect = require('./src/db/db_connect');
const { json } = require('express');


dotenv.config()
const PORT = process.env.PORT;
const app = express();
const httpServer = createServer(app);
app.use(cors())
app.use(json())
app.use(express.urlencoded({extended:false}))

//db connection
dbconnect().then(() => console.log("db connected")).catch(err => console.log(err))

//express endpoints registry
app.get("/images/:name", (req, res) => {
    res.status(200).sendFile(`${__dirname}/public/images/${req.params.name}`)
})
app.use("/auth",require("./src/pipe/auth"))
app.use("/chat",require("./src/pipe/chat"))

//Socket Registry
const io = new Server(httpServer, {
    cors: {}
});
const onConnection = (socket) => {
    registerChatHandler(io, socket)
}
io.on("connection", onConnection);

httpServer.listen(PORT);
module.exports = app
