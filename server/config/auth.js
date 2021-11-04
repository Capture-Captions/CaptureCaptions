exports.isLogin = (req, res, next) => {
  if (!req.session.userId) res.render('login', { userId: req.session.userId })
  else next()
}

exports.isloginAdmin = (req, res, next) => {
  if (!req.session.userId) res.redirect('/admin/login')
  else next()
}
