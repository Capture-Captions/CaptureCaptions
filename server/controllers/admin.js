const Contribution = require('../model/contributions')
const Users = require('../model/userModel')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const nodemailer = require('nodemailer')
const fs = require('fs')

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
  // console.log(item_id + val)
  try {
    const item = await Contribution.findOne({
      _id: item_id,
    }).exec()
    // console.log(item)
    if (val) {
      id = item.public_id
      caption = item.captions
      data =
        id +
        ', ' +
        caption[0] +
        '\n' +
        id +
        ', ' +
        caption[1] +
        '\n' +
        id +
        ', ' +
        caption[2] +
        '\n' +
        id +
        ', ' +
        caption[3] +
        '\n' +
        id +
        ', ' +
        caption[4] +
        '\n'
      fs.appendFile(
        'C:/Users/rahul/Desktop/CaptureCaptions/server/public/files/contribution.txt',
        data,
        'utf8',
        // callback function
        function (err) {
          if (err) throw err
          // if no error
          // console.log('Data is appended to file successfully.')
        }
      )
    }
    const user_id = mongoose.Types.ObjectId(item.userId)
    // console.log(user_id)
    const result = await Contribution.findByIdAndUpdate(
      { _id: item_id },
      { $set: { visited: true, selected: val } }
    ).exec()
    const curUser = await Users.findOne({ _id: user_id })
    const updUser = await Users.findByIdAndUpdate(
      { _id: user_id },
      { $set: { rewards: curUser.rewards + 5 } }
    )
    // console.log(curUser)
    // console.log(updUser)
    let transporter = nodemailer.createTransport({
      // host: 'localhost',
      server: 'smtp.gmail.com',
      // port:465,
      service: 'gmail',
      port: 587,
      auth: {
        user: process.env.SENDER_USER,
        pass: process.env.SENDER_PASSWORD,
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
    })
    let mailOptions = {
      from: `"CaptureCaptions 🖼" <${process.env.SENDER_USER}>`,
      to: curUser.email,
      subject: 'Contribution Accepted',
      html: `<h1>Thanks for contributing to Capture Captions!</h1>
                <p>Your contribution is accepted. Cheers!🎊✨</p>
                <p><b>Following are the details of your contribution:</b></p>
                <p>Contributor Username : ${curUser.name}</p>
                <p>Contributor Email : ${curUser.email}</p>
                <p>Updated Reward Points : ${updUser.rewards}</p>
                <h3>Following are the details of what you have contributed:</h3>
                <img src="" alt="Image should be here" />
                <h5><i>5 Captions:</i></h5>
                <p>1. ${item.captions[0]}</p>
                <p>2. ${item.captions[1]}</p>
                <p>3. ${item.captions[2]}</p>
                <p>4. ${item.captions[3]}</p>
                <p>5. ${item.captions[4]}</p>
                <hr/>
                <p>Keep Contributing and redeem awards! We are delighted to have you as our user!</p>
                <a href="http://localhost:3000/users/contribute" target="_blank">Contribute here</a>
                <h2>Some Ready reference Links</h2>
                <a href="http://localhost:3000/search/upload" target="_blank">Test Model</a><br/>
                <a href="http://localhost:3000/login" target="_blank">Login</a><br/>
  
                Regards,
                Capture Captions
              `,
    }
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        // console.log(error)
        return res.redirect('/admin/contributions')
      }
      // console.log('Message sent: %s', info.messageId)
      // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
      return res.redirect('/admin/contributions')
    })
  } catch (err) {
    console.log('Error occured and thrws')
    throw err
  }

  res.redirect('/admin/contributions')
}
