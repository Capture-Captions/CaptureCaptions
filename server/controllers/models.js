const multer = require('multer')
const mongoose = require('mongoose')
const path = require('path')
const Caption = require('../model/getCaptions')
const { spawn } = require('child_process')
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
  limits: { fileSize: 100000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
}).single('image')
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

exports.model1Action = (req, res) => {
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
        // console.log(req.file)
        // // handle response and database query and model prediction
        // var dataToSend
        // // spawn new child process to call the python script
        // const python = spawn('python', [
        //   '../ml-model/ImgCaptions.py',
        //   req.file.filename,
        // ])
        // // collect data from script
        // python.stdout.on('data', function (data) {
        //   console.log('Pipe data from python script ...')
        //   console.log(`Received chunk ${data}`)
        //   dataToSend = data.toString()
        // })
        // // in close event we are sure that stream from child process is closed
        // python.on('close', (code) => {
        //   console.log(`child process close all stdio with code ${code}`)
        //   // send data to browser
        // })

        const { fieldname, mimetype, filename, size } = req.file
        var cc = {
          fieldname,
          mimetype,
          filename,
          size,
          output: 'working on it',
        }
        Caption.findOne({ _id: req.session.userId._id }, (err, data) => {
          if (err) throw err
          else {
            if (data) {
              console.log(data)
              Caption.updateOne(
                { _id: req.session.userId._id },
                { $push: { searches: { cc } } },
                { upsert: true },
                (er, success) => {
                  if (er) throw er
                  else console.log(success)
                  console.log(cc)
                  res.render('output', { userId: req.session.userId, data: cc })
                }
              )
            } else {
              const newCaption = {
                _id: req.session.userId._id,
                searches: [cc],
              }
              // console.log('newCaption: ' + newCaption)
              // newCaption.save()
              Caption.create(newCaption, (error, resu) => {
                if (error) throw error
                else console.log(resu)
                console.log(cc)
                res.render('output', { userId: req.session.userId, data: cc })
              })
            }
          }
        })
      }
    }
  })
}
