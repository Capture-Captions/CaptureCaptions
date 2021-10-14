exports.isLogin = (req, res, next) => {
  if (req.session.userId) res.render('dashboard')
  else next()
}
