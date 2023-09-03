const express = require('express')
const multer = require("multer")
const authController = require('../controllers/authController')
const validateAuthToken = require('../middlewares/validateAuth')
const router = express.Router()

const upload = multer()

router.post('/signup',upload.single("profilePic"), authController.signUp)
router.post("/login", authController.login)
router.get("/getprofile", validateAuthToken, authController.getProfile)
router.put("/updateuser",[upload.single("profilePic"),validateAuthToken],authController.updateUser)
router.delete("/deleteuser",validateAuthToken,authController.deleteUser)

module.exports = router
