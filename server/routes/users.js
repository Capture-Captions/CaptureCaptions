const express = require('express')
const router = express.Router()
const { isLogin } = require('../config/auth')
const {
  registerAction,
  loginAction,
  logoutAction,
  contributeAction,
  showContri,
} = require('../controllers/users')
router.get('/dashboard', isLogin, (req, res) => {
  res.render('dashboard')
})
router.get('/register', (req, res) => {
  res.render('register')
})
router.get('/login', (req, res) => {
  res.render('login')
})
router.post('/register', registerAction)
router.post('/login', loginAction)
router.get('/logout', logoutAction)
router.get('/contribute', isLogin, (req, res) => {
  res.render('contribute')
})
router.post('/contribute', isLogin, contributeAction)
router.get('/myContributions', isLogin, showContri)
module.exports = router
