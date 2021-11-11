const Contribution = require('../model/contributions')
const Users = require('../model/userModel')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

exports.loginAdmin = (req, res) => {
  // console.log('Inside Login Admin Controller')
  // console.log(req.body)
  Users.findOne({ email: req.body.email }, (err, data) => {
    
    // console.log(data)
    if (err) {
      // console.log(err)
      res.status(422).redirect('/admin/login')
    } else {
      if (data) {
        bcrypt.compare(req.body.password, data.password, (er, boolValue) => {
          if (boolValue) {
            if (er) res.status(400).json({ msg: er })
            req.session.userId = data
            // console.log('Admin Successfully In')
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
      // console.log(err)
    }
    res.clearCookie(process.env.SESSION_NAME)
    res.redirect('/admin/login')
  })
}

exports.contributions = async (req, res) => {
  try {
    const data = await Contribution.find({ visited: false })
      .sort({ createdAt: -1 })
      .exec()
    res.render('admin-contributions', { data })
  } catch (err) {
    res.status(422).json({ msg: err })
    throw err
  }
}

// exports.contributions = (req, res) => {
//   Contribution.find(
//     {
//       visited: false,
//     },
//     (err, data) => {
//       if (err) {
//         // console.log(err)
//         res.status(422).json({ msg: err })
//       } else res.render('admin-contributions', { data })
//     }
//   )
// }

exports.listOfUsers = async (req, res) => {
  try {
    const result = Users.find({}).select('-password').exec()
    result.then((data) => {
      res.status(200).render('admin-user', { data })
    })
  } catch (err) {
    // throw err
    res.status(422).redirect('/admin/dashboard')
  }
  // Users.find({}, (err, data) => {
  //   if (err) {
  //     // console.log(err)
  //     res.status(422).redirect('/admin/dashboard')
  //   } else res.render('admin-user', { data })
  // })
}

exports.contributionAction = async (req, res) => {
  const item_id = mongoose.Types.ObjectId(req.params.id)
  const val = req.params.val == 1 ? true : false
  console.log(item_id + val)
  try {
    const item = await Contribution.findOne({
      _id: item_id,
    }).exec()
    // console.log(item)
    const user_id = mongoose.Types.ObjectId(item.userId)
    const result = await Contribution.findByIdAndUpdate(
      { _id: item_id },
      { $set: { visited: true, selected: val } }
    ).exec()
    const curUser = await Users.findById({ _id: user_id })
    const updUser = await Users.findByIdAndUpdate(
      { _id: user_id },
      { $set: { rewards: curUser.rewards + 5 } }
    )
  } catch (err) {
    throw err
  }
  res.redirect('/admin/contributions')
}
