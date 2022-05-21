const router = require('express').Router();
const { userController } = require('../controllers');
const tokenHandler = require('../middlewares/tokenHandler')

router.post(
    '/register',
    userController.register
)

router.post(
    '/login',
    userController.login
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
    userController.getAll
)

router.get(
    '/:id',
    userController.getOne
)

router.put(
    '/:id',
    userController.update
)

router.delete(
    '/:id',
    userController.delete
)

module.exports = router;