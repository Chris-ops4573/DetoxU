const {Router} = require("express")
const authController = require("../controllers/authcontroller")

const router = Router();
     
router.get('/home', authController.requireAuth, authController.checkUser, (req, res) => {
    res.status(200).json({userId : req.userId, user: req.user})
})

module.exports = router