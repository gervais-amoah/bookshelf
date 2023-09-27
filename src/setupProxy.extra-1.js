function proxy(app) {
  app.get(/^\/$/, (req, res) => res.redirect(301, '/discover'))
}

module.exports = proxy
