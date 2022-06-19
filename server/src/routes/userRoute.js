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
    tokenHandler.verifyAdToken,
    userController.getUserList
)

router.get(
    '/:id',
    tokenHandler.verifyToken,
    userController.getUserInfo
)

router.put(
    '/:id',
    tokenHandler.verifyToken,
    userController.putUser
)

router.put(
    '/edit/change-role',
    tokenHandler.verifyModToken,
    userController.putChangeRole
)

router.delete(
    '/:id',
    tokenHandler.verifyAdToken,
    userController.deleteUser
)


module.exports = router;