const express = require('express')
const router = express.Router()
const { isloginAdmin } = require('../config/auth')
const {
  loginAdmin,
  logoutAdmin,
  contributions,
  listOfUsers,
  contributionAction,
} = require('../controllers/admin')

router.get('/login', (req, res) => {
  res.send('Admin login')
})
router.post('/login', loginAdmin)
router.get('/logout', logoutAdmin)
router.get('/contributions', isloginAdmin, contributions)
router.get('/users', isloginAdmin, listOfUsers)
router.get('/:id/:val', isloginAdmin, contributionAction)
module.exports = router
