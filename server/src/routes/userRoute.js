const router = require('express').Router();
const { userController } = require('../controllers');
const tokenHandler = require('../middlewares/tokenHandler')

router.post(
    '/register',
    userController.postRegister
)

router.post(
    '/login',
    userController.postLogin
)

router.post(
    '/check-token',
    tokenHandler.verifyToken,
    (req, res) => {
        res.status(200).json(req.user)
    }
)

router.get(
    '/',
    userController.getUserList
)

router.get(
    '/:id',
    userController.getUserInfo
)

router.put(
    '/:id',
    userController.putUser
)

router.delete(
    '/:id',
    tokenHandler.verifyAdToken,
    userController.deleteUser
)

module.exports = router;