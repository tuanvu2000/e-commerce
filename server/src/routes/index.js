const router = require('express').Router();

router.use('/user', require('./userRoute'));
router.use('/product', require('./productRoute'));
router.use('/order', require('./orderRoute'));
router.use('/profile', require('./profileRoute'));

module.exports = router;