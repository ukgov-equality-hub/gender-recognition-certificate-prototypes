const express = require('express')
const router = new express.Router()

// Set variables
router.get('*', function(req, res, next){
  // Change the service name for this feature
  // res.locals['serviceName'] = 'Check if you can get a Gender Recognition Certificate'

  // Change the service name URL so it links back this features index
  res.locals['serviceUrl'] = '/'+req.originalUrl.split('/')[1]+'/'

  next()
})

// Clear session data on start page
router.get('/start', function (req, res, next) {
  req.session.destroy()
  next()
})

// Clear session data on apply page
router.get('/apply', function (req, res, next) {
  req.session.destroy()
  next()
})



/////////////////////////////////////////////////////
// ELIGIBILITY
//
router.post('/eligibility/age-check', function (req, res) {
  if (req.session.data['age-check'] == 'No') {
    res.redirect('not-old-enough');
  } else {
    res.redirect('overseas-check');
  }
})

router.post('/eligibility/overseas-check', function (req, res) {
  if (req.session.data['overseas-check'] == 'Yes') {
    res.redirect('overseas-approved-check');
  } else {
    res.redirect('dysphoria-check');
  }
})

router.post('/eligibility/overseas-approved-check', function (req, res) {
  if (req.session.data['overseas-approved-check'] == 'Yes') {
    res.redirect('overseas-track');
  } else {
    res.redirect('dysphoria-check');
  }
})

router.post('/eligibility/dysphoria-check', function (req, res) {
  if (req.session.data['dysphoria-check'] == 'No') {
    res.redirect('dysphoria-no');
  } else {
    // res.redirect('two-years-check');
    res.redirect('../marriage-civil-partnership/current-check');
  }
})

router.post('/eligibility/two-years-check', function (req, res) {
  if (req.session.data['two-years-check'] == 'No') {
    res.redirect('two-years-no');
  } else {
    res.redirect('until-death-check');
  }
})

router.post('/eligibility/until-death-check', function (req, res) {
  if (req.session.data['until-death-check'] == 'No') {
    res.redirect('until-death-no');
  } else {
    res.redirect('../marriage-civil-partnership/current-check');
  }
})
//
// ELIGIBILITY
/////////////////////////////////////////////////////





/////////////////////////////////////////////////////
// MARRIAGE / CIVIL PARTNERSHIP
//
router.post('/marriage-civil-partnership/current-check', function (req, res) {
  if (req.session.data['current-check'] == 'Neither') {
    res.redirect('partner-died');
  } else if (req.session.data['current-check'] == 'Civil partnership') {
    res.redirect('protected-civil-partnership');
  } else {
    res.redirect('protected-marriage');
  }
})

router.post('/marriage-civil-partnership/partner-died', function (req, res) {
  res.redirect('../personal/name');
})





// MARRIAGE
router.post('/marriage-civil-partnership/protected-marriage', function (req, res) {
  if (req.session.data['protected-marriage'] == 'No') {
    res.redirect('interim-check');
  } else {
    res.redirect('stay-together');
  }
})

router.post('/marriage-civil-partnership/stay-together', function (req, res) {
  if (req.session.data['stay-together'] == 'No') {
    res.redirect('interim-check');
  } else {
    res.redirect('../personal/name');
  }
})




//CIVIL PARTNERSHIP
router.post('/marriage-civil-partnership/protected-civil-partnership', function (req, res) {
  if (req.session.data['protected-civil-partnership'] == 'No') {
    res.redirect('interim-check');
  } else if (req.session.data['protected-civil-partnership'] == 'Yes, a protected Scottish civil partnership') {
    res.redirect('same-time');
  } else {
    res.redirect('stay-together');
  }
})

router.post('/marriage-civil-partnership/same-time', function (req, res) {
  if (req.session.data['same-time'] == 'No') {
    res.redirect('interim-check');
  } else {
    res.redirect('../personal/name');
  }
})





router.post('/marriage-civil-partnership/interim-check', function (req, res) {
  if (req.session.data['interim-check'] == 'No') {
    res.redirect('interim-no');
  } else {
    res.redirect('../personal/name');
  }
})
//
// MARRIAGE / CIVIL PARTNERSHIP
/////////////////////////////////////////////////////





/////////////////////////////////////////////////////
// PERSONAL DETAILS
//
router.post('/personal/name', function (req, res) {
  res.redirect('name-for-correspondence-check');
})

router.post('/personal/name-for-correspondence-check', function (req, res) {
  if (req.session.data['name-for-correspondence-check'] == 'No') {
    res.redirect('address');
  } else {
    res.redirect('name-for-correspondence');
  }
})

router.post('/personal/name-for-correspondence', function (req, res) {
  res.redirect('address');
})

router.post('/personal/address', function (req, res) {
  res.redirect('contact-preferences');
})

router.post('/personal/contact-preferences', function (req, res) {
  res.redirect('hmrc');
})

router.post('/personal/hmrc', function (req, res) {
  if (req.session.data['notify-hmrc'] == 'No') {
    res.redirect('../birth-adoption/name');
  } else {
    res.redirect('ni-number');
  }
})

router.post('/personal/ni-number', function (req, res) {
  res.redirect('../birth-adoption/name');
})
//
// PERSONAL DETAILS
/////////////////////////////////////////////////////





/////////////////////////////////////////////////////
// BIRTH / ADOPTION
//
router.post('/birth-adoption/name', function (req, res) {
  res.redirect('sex');
})

router.post('/birth-adoption/sex', function (req, res) {
  res.redirect('dob');
})

router.post('/birth-adoption/dob', function (req, res) {
  res.redirect('uk-check');
})

router.post('/birth-adoption/uk-check', function (req, res) {
  if (req.session.data['uk-check'] == 'No') {
    res.redirect('country');
  } else {
    res.redirect('mothers-name');
  }
})

router.post('/birth-adoption/country', function (req, res) {
  res.redirect('../payment/help-check');
})

router.post('/birth-adoption/mothers-name', function (req, res) {
  res.redirect('fathers-name-check');
})

router.post('/birth-adoption/fathers-name-check', function (req, res) {
  if (req.session.data['fathers-name-check'] == 'No') {
    res.redirect('place-of-birth');
  } else {
    res.redirect('fathers-name');
  }
})

router.post('/birth-adoption/fathers-name', function (req, res) {
  res.redirect('place-of-birth');
})

router.post('/birth-adoption/place-of-birth', function (req, res) {
  res.redirect('adopted');
})

router.post('/birth-adoption/adopted', function (req, res) {
  res.redirect('forces');
})

router.post('/birth-adoption/forces', function (req, res) {
  res.redirect('../payment/help-check');
})
//
// BIRTH / ADOPTION
/////////////////////////////////////////////////////





/////////////////////////////////////////////////////
// PAYMENT
//
router.post('/payment/help-check', function (req, res) {
  if (req.session.data['help-check'] == 'Yes') {
    res.redirect('help-type');
  } else {
    res.redirect('method');
  }
})

router.post('/payment/help-type', function (req, res) {
  res.redirect('../check-your-answers');
})

router.post('/payment/method', function (req, res) {
  res.redirect('../check-your-answers');
})
//
// PAYMENT
/////////////////////////////////////////////////////


router.post('/eligibility/declaration', function (req, res) {
  res.redirect('task-list');
})






// Add your routes above the module.exports line
module.exports = router
