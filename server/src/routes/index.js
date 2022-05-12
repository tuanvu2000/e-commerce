const router = require('express').Router();

router.use('/user', require('./userRoute'));
router.use('/product', require('./productRoute'));


module.exports = router;