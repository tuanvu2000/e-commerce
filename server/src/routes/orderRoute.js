const router = require('express').Router();
const { orderController } = require('../controllers');

router.post(
    '/new',
    orderController.postNewOrder
)

router.get(
    '/',
    orderController.getAll
)

router.get(
    '/detail/:id',
    orderController.getOne
)

router.put(
    '/status/:id',
    orderController.putStatus
)

router.get(
    '/history/:id',
    orderController.getHistoryOrder
)

router.get(
    '/order-new',
    orderController.getNewOrder
)


router.get(
    '/admin-summary',
    orderController.getSummary
)

module.exports = router;