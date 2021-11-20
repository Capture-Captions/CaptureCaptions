const express = require('express')
const router = express.Router()
const { isLogin } = require('../config/auth')
const {
  registerAction,
  loginAction,
  logoutAction,
  contributeAction,
  showContri,
  dashboardAction,
  updateDetails,
} = require('../controllers/users')
router.get('/dashboard', isLogin, dashboardAction)
router.get('/register', (req, res) => {
  res.render('register')
})
router.get('/login', (req, res) => {
  res.render('login')
})
router.get('/upload', isLogin, (req, res) => {
  res.render('fileupload', { userId: req.session.userId })
})
router.post('/register', registerAction)
router.post('/login', loginAction)
router.get('/logout', logoutAction)
router.get('/contribute', isLogin, (req, res) => {
  res.render('contribute', { userId: req.session.userId })
})
router.post('/contribute', isLogin, contributeAction)
router.get('/myContributions', isLogin, showContri)
router.post('/update/details', isLogin, updateDetails)
module.exports = router
