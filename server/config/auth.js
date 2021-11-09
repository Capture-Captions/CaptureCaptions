exports.isLogin = (req, res, next) => {
  if (!req.session.userId) res.render('login', { userId: req.session.userId })
  else return next()
}

exports.isloginAdmin = (req, res, next) => {
  if (!req.session.userId) res.redirect('/admin/login')
  else return next()
}
