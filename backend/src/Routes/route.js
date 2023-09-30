const express = require("express")
const router = express.Router()
const userController=require("../controller/userController")

router.get("/test-me", function (req, res) {
  res.send("My first ever  project1  api!");
});


router.post('/register',userController.registerUser)


router.post("/login",userController.loginUser)
router.all("/*", function (req,res) {
    return res.status(400).send("invalid Route path!")
})



module.exports = router;