const {Router} = require("express")
const authController = require("../controllers/authcontroller")

const router = Router();

router.get('/signup', authController.signup_get)
router.get('/login', authController.login_get)
router.post('/signup', authController.signup_post)
router.post('/login', authController.login_post)
router.post('/logout', authController.logout_get)

module.exports = router