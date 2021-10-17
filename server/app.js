// Imports
const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const expressLayouts = require('express-ejs-layouts')
require('dotenv').config({ path: './.env' })

//Initializations
const app = express()
app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
app.use(expressLayouts)

app.get('/', (req, res) => {
  res.render('welcome')
})

// Mongodb connection

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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

// Routes
app.use('/users', require('./routes/users'))
app.use('/admin', require('./routes/admin'))
app.use('/search', require('./routes/search'))
// connect to the server
app.listen(3000 || process.env.PORT, () => {
  console.log('Server is up and running')
})
