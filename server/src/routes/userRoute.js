const router = require('express').Router();
const { userController } = require('../controllers');

router.post(
    '/register',
    userController.register
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

module.exports = router;