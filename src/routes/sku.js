// route/ArticleRoute.js
const express = require('express')
const skuController = require('../controllers/skuController')
const router = express.Router()
router.post('/', skuController.insertSku)
router.get('/', skuController.getallSkus)
router.get('/:sku', skuController.getSku)
router.put('/:sku', skuController.updateSku)
router.delete('/:sku', skuController.deleteSku)
// router.get('/aboutSku', skuController.aboutSku);
// router.get('/books', skuController.book_list);
module.exports = router
