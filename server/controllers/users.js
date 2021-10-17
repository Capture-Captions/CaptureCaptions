const User = require('../model/userModel')
const Contribution = require('../model/contributions')
const bcrypt = require('bcrypt')
const multer = require('multer')
const path = require('path')
const saltRounds = 10
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
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
  const filetypes = /jpeg|jpg|png|gif/
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
        console.log(req.body)
        const { c1, c2, c3, c4, c5 } = req.body
        const { fieldname, mimetype, filename, size } = req.file
        var cc = {
          fieldname,
          mimetype,
          filename,
          size,
          captions: [c1, c2, c3, c4, c5],
        }
        Contribution.findOne({ _id: req.session.userId._id }, (err, data) => {
          if (err) throw err
          else {
            if (data) {
              Contribution.updateOne(
                { _id: req.session.userId._id },
                { $push: { items: { cc } } },
                (er, success) => {
                  if (er) console.log(er)
                  else {
                    console.log(success)
                    res.redirect('/users/myContributions')
                  }
                }
              )
            } else {
              const newContri = new Contribution({
                _id: req.session.userId._id,
                items: [cc],
              })
              newContri.save()
              res.redirect('/users/myContributions')
            }
          }
        })
      }
    }
  })
}

exports.showContri = (req, res) => {
  Contribution.findOne({ _id: req.session.userId._id }, (err, result) => {
    if (err) console.log(err)
    else {
      if (result) res.json(result)
      else res.json({ msg: 'No Contributions' })
    }
  })
}
