const express = require('express')
const chatController = require("../controllers/chatController")
const validateAuthToken = require('../middlewares/validateAuth')
const router = express.Router()

router.post("/create",validateAuthToken,chatController.createChat)
router.post("/fetchall",validateAuthToken,chatController.getChats)

module.exports = router