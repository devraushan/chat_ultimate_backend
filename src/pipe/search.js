const express = require('express')
const searchController = require("../controllers/searchController")
const validateAuthToken = require('../middlewares/validateAuth')
const router = express.Router()

router.get("/user:params",validateAuthToken,searchController.userSearch)
module.exports = router
