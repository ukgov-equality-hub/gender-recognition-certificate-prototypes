const express = require('express')
const router = new express.Router()

// Set variables
router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Check if you can get a Gender Recognition Certificate'

  // Change the service name URL so it links back this features index
  res.locals['serviceUrl'] = '/'+req.originalUrl.split('/')[1]+'/'

  next()
})

// Clear session data on start page
router.get('/start', function (req, res, next) {
  req.session.destroy()
  next()
})

router.post('/age-check', function (req, res) {
  if (req.session.data['age-check'] == 'No') {
    res.redirect('not-old-enough');
  } else {
    res.redirect('overseas-check');
  }
})

router.post('/overseas-check', function (req, res) {
  if (req.session.data['overseas-check'] == 'Yes') {
    res.redirect('overseas-approved-check');
  } else {
    res.redirect('select-track');
  }
})

router.post('/overseas-approved-check', function (req, res) {
  if (req.session.data['overseas-approved-check'] == 'Yes') {
    res.redirect('overseas-track');
  } else {
    res.redirect('select-track');
  }
})

router.post('/select-track', function (req, res) {
  if (req.session.data['select-track'] == 'I cannot provide evidence for either track') {
    res.redirect('no-evidence');
  } else if (req.session.data['select-track'] == 'Alternative track') {
    res.redirect('alternative-track');
  } else {
    res.redirect('standard-track');
  }
})





// Add your routes above the module.exports line
module.exports = router
