const router = require('express').Router();
const tokenHandler = require('../middlewares/tokenHandler')
const { productController } = require('../controllers');

router.post(
    '/add',
    tokenHandler.verifyAdToken,
    productController.add
)

router.get(
    '/',
    productController.getAll
)

router.get(
    '/:id',
    productController.getOne
)

router.put(
    '/:id',
    tokenHandler.verifyAdToken,
    productController.update
)

router.delete(
    '/:id',
    tokenHandler.verifyAdToken,
    productController.delete
)

router.get(
    '/list/best-sell',
    productController.bestSell
)

router.get(
    '/list/best-sale',
    productController.bestSale
)

router.get(
    '/list/:category',
    productController.listSubCategory
)

router.post(
    '/store',
    productController.listType
)

router.get(
    '/store/non-bao-hiem/:subCategory',
    productController.listHatSub
)

router.get(
    '/store/phu-kien/:subCategory',
    productController.listAccessorySub
)

router.get(
    '/store/thuong-hieu/:brand',
    productController.listBrand
)

module.exports = router;