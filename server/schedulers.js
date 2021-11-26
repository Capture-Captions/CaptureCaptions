const schedule = require('node-schedule')
const nodemailer = require('nodemailer')
const User = require('./model/userModel')
const job1 = schedule.scheduleJob('0 0 * * *', function () {
  User.find()
    .select('email name')
    .exec()
    .then((results) => {
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
      let val = ''
      let mailOptions = {
        from: `"CaptureCaptions 🖼" <${process.env.SENDER_USER}>`,
        to: '',
        subject: 'Task for the Day',
      }
      results.forEach((user) => {
        mailOptions.to = user.email
        mailOptions.html =  ` <h1>New Day New Task!</h1> 
            <p>Hey ${user.name}!</p>
            <p><i>New task has been created ✔. We are looking forward for your response</i></p>
            <p>Complete the daily task, win the reward points.</p>
            <a href="http://localhost:3000/users/dashboard">Dashboard</a><br>
            <a href="http://localhost:3000/users/task/unsubscribe/${user._id}">Unsubscribe here</a>
     ` = 
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error)
            // return res.redirect('/admin/contributions')
          }
          // console.log('Message sent: %s', info.messageId)
          // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
          // return res.redirect('/admin/contributions')
          console.log('success')
        })
      })
    })
    .catch((err) => {
      console.log(err)
    })
})
