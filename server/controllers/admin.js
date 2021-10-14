const Contribution = require('../model/contributions')
const User = require('../model/userModel')

exports.loginAdmin = (req, res) => {
  User.findOne({ email: req.body.email }, (err, data) => {
    if (err) {
      console.log(err)
      res.redirect('/admin/login')
    } else {
      if (data) {
        bcrypt.compare(req.body.password, data.password, (err, boolValue) => {
          if (boolValue) {
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
  Contribution.find({ visited: false }, (err, data) => {
    if (err) {
      console.log(err)
      res.redirect('/admin/dashboard')
    } else res.send(data)
  })
}

exports.listOfUsers = (req, res) => {
  User.find({}, (err, data) => {
    if (err) {
      console.log(err)
      res.redirect('/admin/dashboard')
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
          User.findOneAndUpdate(
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
