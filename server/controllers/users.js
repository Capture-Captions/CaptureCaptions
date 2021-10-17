const User = require('../model/userModel')
const bcrypt = require('bcrypt')
const saltRounds = 10

exports.registerAction = (req, res) => {
  User.findOne({ email: req.body.email }, (err, data) => {
    if (err) {
      console.log(err)
      res.render('register')
    } else {
      if (!data) {
        bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
          const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hash,
            rewards: 0,
          })
          newUser.save((err) => {
            if (err) throw err
            else console.log('user saved')
            req.session.userId = newUser
            res.render('dashboard')
          })
        })
      } else res.render('register')
    }
  })
}

exports.loginAction = (req, res) => {
  User.findOne({ email: req.body.email }, (err, data) => {
    if (err) {
      console.log(err)
      res.render('login')
    } else {
      if (data) {
        bcrypt.compare(req.body.password, data.password, (err, boolValue) => {
          if (boolValue) {
            req.session.userId = data
            res.redirect('/users/dashboard')
          }
        })
      } else res.redirect('/users/login')
    }
  })
}

exports.logoutAction = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err)
    }
    res.clearCookie(process.env.SESSION_NAME)
    res.redirect('/')
  })
}
