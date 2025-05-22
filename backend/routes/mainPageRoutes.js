const {Router} = require("express")
const authController = require("../controllers/authcontroller")

const router = Router();
     
router.get('/home', authController.requireAuth, (req, res) => {
    console.log('worked')
    res.status(200).json({userId : req.userId})
})

module.exports = router