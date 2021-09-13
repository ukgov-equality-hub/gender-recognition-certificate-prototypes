const express = require('express')
const router = express.Router()
const config = require('./config.js')

// Clear session data without confirmation
router.get('/prototype-admin/clear-data', function (req, res) {
  req.session.destroy()
  res.redirect('/')
})

// Grab the URL for the heroku link and check if local env
router.use('/', (req, res, next) => {
  res.locals.repoURL = config.repoURL
  res.locals.herokuURL = config.herokuURL
  res.locals.currentURL = req.url
  res.locals.internal = config.internal

  if (req.get('host').includes('localhost')) {
    res.locals.host = true
  }

  next()
})

router.get('/', function (req, res) {
  res.render('overview')
})




// Add your routes above the module.exports line
module.exports = router
