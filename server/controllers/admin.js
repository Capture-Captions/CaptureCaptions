const Contribution = require('../model/contributions')
const Users = require('../model/userModel')
const bcrypt = require('bcrypt')

exports.loginAdmin = (req, res) => {
  console.log('Inside Login Admin Controller')
  console.log(req.body)
  Users.findOne({ email: req.body.email }, (err, data) => {
    console.log('Inside mongo')
    console.log(data)
    if (err) {
      console.log(err)
      res.status(422).redirect('/admin/login')
    } else {
      if (data) {
        bcrypt.compare(req.body.password, data.password, (er, boolValue) => {
          if (boolValue) {
            if (er) res.status(400).json({ msg: er })
            req.session.userId = data
            console.log('Admin Successfully In')
            res.redirect('/admin/dashboard')
          }
        })
      } else res.render('/admin/login')
    }
  })
}

exports.logoutAdmin = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err)
    }
    res.clearCookie(process.env.SESSION_NAME)
    res.redirect('/admin/login')
  })
}

exports.contributions = (req, res) => {
  Contribution.find(
    {
      'items.visited': false,
      'items.selected': false,
    },
    (err, data) => {
      if (err) {
        console.log(err)
        res.status(422).json({ msg: err })
      } else res.render('admin-contributions', { data })
    }
  )
}

exports.listOfUsers = (req, res) => {
  Users.find({}, (err, data) => {
    if (err) {
      console.log(err)
      res.status(422).redirect('/admin/dashboard')
    } else res.render('admin-user', { data })
  })
}

exports.contributionAction = async (req, res) => {
  const id = req.params.id
  const val = req.params.val
  console.log(id + ': ' + val)
  let contri = Contribution.findOne({ id })
  console.log(contri)
  let result = Contribution.findOneAndUpdate(
    { id },
    { $set: { visited: true, selected: val } }
  )
  let curUser = Users.findOne({ id: contri.userId })
  if (val == true) {
    let r = User.findOneAndUpdate(
      { id: contri.userId },
      { $set: { rewards: curUser.rewards + 5 } }
    )
  }
  res.redirect('/admin/contributions')
}
