const express = require('express')
const chatController = require("../controllers/chatController")
const messageController = require("../controllers/messageController")
const validateAuthToken = require('../middlewares/validateAuth')
const router = express.Router()

router.post("/create",validateAuthToken,chatController.createChat)
router.post("/fetchall",validateAuthToken,chatController.getChats)
router.post("/getMessages",validateAuthToken,messageController.fetchMessage)

module.exports = router