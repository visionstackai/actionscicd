// route/ArticleRoute.js
const express = require('express')
const bookController = require('../controllers/bookController')
const router = express.Router()
router.get('/', bookController.book_list)
router.get('/books', bookController.book_list_all)
module.exports = router
