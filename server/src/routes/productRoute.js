const router = require('express').Router();
const { productController } = require('../controllers');

router.post(
    '/add',
    productController.add
)

router.get(
    '/',
    productController.getAll
)


module.exports = router;