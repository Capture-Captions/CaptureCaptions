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
router.get('/login', isLogin, (req, res) => {
  res.render('dashboard')
})

router.get('/signup', (req, res) => {
  res.render('signup', { userId: req.session.userId })
})
router.get('/', (req, res) => {
  console.log(req.session.userId)
  res.render('home', { userId: req.session.userId })
})
router.get('/about', (req, res) => {
  res.render('about', { userId: req.session.userId })
})
router.get('/contact', (req, res) => {
  res.render('contact', { userId: req.session.userId })
})
router.get('/volunteer', (req, res) => {
  res.render('contribute', { userId: req.session.userId })
})

module.exports = router
