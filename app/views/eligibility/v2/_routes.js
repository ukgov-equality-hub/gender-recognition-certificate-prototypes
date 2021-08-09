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
    res.redirect('dysphoria-check');
  }
})

router.post('/overseas-approved-check', function (req, res) {
  if (req.session.data['overseas-approved-check'] == 'Yes') {
    res.redirect('overseas-track');
  } else {
    res.redirect('dysphoria-check');
  }
})

router.post('/dysphoria-check', function (req, res) {
  if (req.session.data['dysphoria-check'] == 'No') {
    res.redirect('surgical-treatment-check');
  } else {
    res.redirect('two-years-check');
  }
})


// Standard track

router.post('/two-years-check', function (req, res) {
  if (req.session.data['two-years-check'] == 'No') {
    res.redirect('two-years-no');
  } else {
    res.redirect('until-death-check');
  }
})


// Alternative track

router.post('/surgical-treatment-check', function (req, res) {
  if (req.session.data['surgical-treatment-check'] == 'No') {
    res.redirect('surgical-treatment-no');
  } else {
    res.redirect('uk-check');
  }
})

router.post('/uk-check', function (req, res) {
  if (req.session.data['uk-check'] == 'No') {
    res.redirect('uk-no');
  } else {
    res.redirect('protected-marriage-check');
  }
})

router.post('/protected-marriage-check', function (req, res) {
  if (req.session.data['protected-marriage-check'] == 'No') {
    res.redirect('protected-marriage-no');
  } else {
    res.redirect('six-years-check');
  }
})

router.post('/six-years-check', function (req, res) {
  if (req.session.data['six-years-check'] == 'No') {
    res.redirect('six-years-no');
  } else {
    res.redirect('until-death-check');
  }
})


// Both tracks finish with the death check

router.post('/until-death-check', function (req, res) {
  if (req.session.data['until-death-check'] == 'No') {
    res.redirect('until-death-no');
  } else if (req.session.data['dysphoria-check'] == 'No') {
    res.redirect('alternative-track');
  } else {
    res.redirect('standard-track');
  }
})






// Add your routes above the module.exports line
module.exports = router
