const express = require('express')
const router = express.Router()
const { isLogin } = require('../config/auth')
const {
  registerAction,
  loginAction,
  logoutAction,
} = require('../controllers/users')
router.get('/register', (req, res) => {
  res.render('register')
})
router.get('/login', isLogin, (req, res) => {
  res.render('login')
})
router.post('/register', registerAction)
router.post('/login', loginAction)
router.get('/logout', logoutAction)

module.exports = router
