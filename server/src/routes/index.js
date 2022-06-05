const router = require('express').Router();

router.use('/user', require('./userRoute'));
router.use('/product', require('./productRoute'));
router.use('/order', require('./orderRoute'));

module.exports = router;