const express = require('express')
const router = express.Router()
const { isLogin } = require('../config/auth')
const { model1Action } = require('../controllers/models')
router.get('/upload', (req, res) => {
  res.render('fileupload', { userId: req.session.userId })
})
router.post('/model-1', model1Action)

module.exports = router
