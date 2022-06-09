const router = require('express').Router();
const { accountController } = require('../controllers');

router.post(
    '/create',
    accountController.create
)

module.exports = router;