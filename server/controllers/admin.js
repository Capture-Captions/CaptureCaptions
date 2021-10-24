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
      } else res.status(200).json(data)
    }
  )
}

exports.listOfUsers = (req, res) => {
  Users.find({}, (err, data) => {
    if (err) {
      console.log(err)
      res.status(422).redirect('/admin/dashboard')
    } else res.send(data)
  })
}

exports.contributionAction = (req, res) => {
  const id = req.params.id
  const val = req.params.val
  Contribution.findOneAndUpdate(
    { date: id },
    { $set: { visited: true, selected: val } },
    { upsert: true },
    (err, data) => {
      if (err) {
        console.log(err)
        res.redirect('/admin/contributions')
      } else {
        console.log('updated in contributions')
        if (val == 'true') {
          Users.findOneAndUpdate(
            { _id: data.referenceID },
            { $set: { rewards: rewards + 5 } },
            { unset: true },
            (er, result) => {
              if (er) throw er
              else {
                console.log('Updated in users')
                res.redirect('/admin/contributions')
              }
            }
          )
        } else res.redirect('/admin/contributions')
      }
    }
  )
}
