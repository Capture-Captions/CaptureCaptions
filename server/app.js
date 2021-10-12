// Imports
const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
require('dotenv').config({ path: './.env' })

//Initializations
const app = express()
app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.get('/', (req, res) => {
  res.send('Welcome')
  res.end()
})

// Mongodb connection
const url =
  'mongodb+srv://rahuljindal1236:' +
  process.env.MONGO_PASSWORD +
  '@cluster0.xxfii.mongodb.net/' +
  process.env.DB_NAME +
  '?retryWrites=true&w=majority'
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database Connection established')
  })
  .catch((err) => {
    console.log(err)
  })

//user session
app.use(
  session({
    name: process.env.SESSION_NAME,
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: Number(process.env.SESSION_LIFETIME),
      originalMaxAge: 1000 * 60 * 30,
      sameSite: true,
      secure: false,
    },
  })
)

// connect to the server
app.listen(3000 || process.env.PORT, () => {
  console.log('Server is up and running')
})
