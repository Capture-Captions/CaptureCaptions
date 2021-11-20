const User = require('../model/userModel')
const Contribution = require('../model/contributions')
const Caption = require('../model/getCaptions')
const bcrypt = require('bcrypt')
const multer = require('multer')
const path = require('path')
const saltRounds = 10
const nodemailer = require('nodemailer')
const cloudinary = require('../config/cloudinary')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads/')
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    )
  },
})
const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
}).single('img')
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png/
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  // Check mime
  const mimetype = filetypes.test(file.mimetype)

  if (mimetype && extname) {
    return cb(null, true)
  } else {
    cb('Error: Images Only!')
  }
}

exports.dashboardAction = async (req, res) => {
  try {
    data = await Caption.findOne({ _id: req.session.userId._id })
      .sort({
        createdAt: -1,
      })
      .exec()
    console.log(data)
    res.render('dashboard', { userId: req.session.userId, data })
  } catch (err) {
    res.render('dashboard', { userId: req.session.userId })
    throw err
  }
}
exports.registerAction = (req, res) => {
  User.findOne({ email: req.body.email }, (err, data) => {
    if (err) {
      console.log(err)
      return res.redirect('/signup')
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
              to: req.body.email,
              subject: 'New Account Created',
              html: `<h1>Thanks for joining Capture Captions!</h1>
                <p>Your new account is created with following credentials</p>
                <p>Email: ${req.body.email}</p>
                <p>Password: ${req.body.password}</p>
                <p>Login to our website, test our model and enjoy more features.</p>
                <h2>Some Ready reference Links</h2>
                <a href="http://localhost:3000/search/upload" target="_blank">Test Model</a><br/>
                <h2><em>Contribute to our Dataset to generate more accurate captions</em></h2>
                <a href="http://localhost:3000/users/contribute" target="_blank">Contribute here</a>
              `,
            }
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.log(error)
                return res.redirect('/signup')
              }
              // console.log('Message sent: %s', info.messageId)
              // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
              req.session.userId = newUser
              return res.redirect('/users/dashboard')
            })
          })
        })
      } else res.redirect('/signup')
    }
  })
}

exports.loginAction = (req, res) => {
  User.findOne({ email: req.body.email }, (err, data) => {
    if (err) {
      console.log(err)
      return res.render('login', { userId: req.session.userId })
    } else {
      if (data) {
        bcrypt.compare(req.body.password, data.password, (err, boolValue) => {
          if (boolValue) {
            req.session.userId = data
            // console.log(req.session.userId)
            return res.redirect('/users/dashboard')
          } else return res.redirect('/login')
        })
      } else return res.redirect('/login')
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

exports.contributeAction = (req, res) => {
  console.log(req.body)
  upload(req, res, (err) => {
    if (err) {
      res.json({
        error: err.message,
      })
    } else {
      if (req.file == undefined) {
        res.json({
          msg: 'Error: No File Selected!',
        })
      } else {
        console.log(req.file)
        const { c1, c2, c3, c4, c5 } = req.body
        const { fieldname, mimetype, filename, size } = req.file
        var imgUpload
        cloudinary.uploader.upload(
          req.file.path,
          { folder: 'contributions' },
          (result, err) => {
            imgUpload = result
            // console.log('inside')
            // if (err) console.log(err)

            // console.log('outside')
            // console.log(imgUpload)
            newContri = new Contribution({
              userId: req.session.userId._id,
              fieldname,
              mimetype,
              filename,
              size,
              captions: [c1, c2, c3, c4, c5],
              cloudinary_url: err.secure_url,
              public_id: err.public_id,
            })
            console.log(newContri)
            newContri.save()
            res.render('thankyou', { userId: req.session.userId })
          }
        )
      }
    }
  })
}

exports.showContri = async (req, res) => {
  // Contribution.find({ userId: req.session.userId._id }, (err, result) => {
  //   console.log(result)
  //   if (err) throw err
  //   else {
  //     res.render('mycontri', {
  //       userId: req.session.userId,
  //       data: result,
  //     })
  //   }
  // })
  try {
    const result = await Contribution.find({ userId: req.session.userId._id })
      .sort({ createdAt: -1 })
      .exec()
    res.render('mycontri', {
      userId: req.session.userId,
      data: result,
    })
  } catch (err) {
    throw err
  }
}

exports.updateDetails = (req, res) => {
  // console.log(req.body)
  var name =
    req.session.userId.name != req.body.name
      ? req.body.name
      : req.session.userId.name
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    User.findOneAndUpdate(
      { _id: req.session.userId._id },
      { name: name, password: hash },
      { new: true },
      (err, data) => {
        if (err) {
          console.log(err)
          return res.redirect('/users/dashboard')
        } else {
          // console.log('after delte')
          // console.log(data)
          req.session.userId = data
          return res.redirect('/users/dashboard')
        }
      }
    )
  })
}
