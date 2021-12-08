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


router.post('*', function(req, res, next){
  if (req.session.data['cya']) {
    delete req.session.data['cya']
    res.redirect('check-your-answers');
  } else if (req.session.data['cya-end']) {
    delete req.session.data['cya-end']
    res.redirect('../payment/check-your-answers');
  } else {
    next()
  }
})

// Clear session data on apply page
router.get('/guidance/apply', function (req, res, next) {
  req.session.destroy()
  next()
})





/////////////////////////////////////////////////////
// BEFORE YOU START
//

router.post('/application/start-application', function (req, res) {
  req.session.data['returning'] = false

  if (req.session.data['return-choice'] == 'Neither') {
    req.session.data['signedin'] = 'false'
    res.redirect('overseas-check');
  } else {
    res.redirect('save-and-return/security-code');
  }
})

router.post('/application/save-and-return/return', function (req, res) {
  req.session.data['returning'] = true
  res.redirect('security-code');
})

router.post('/application/save-and-return/security-code', function (req, res) {
  if (req.session.data['returning']) {
    req.session.data['signedin'] = 'true'
    res.redirect('../task-list');
  } else {
    res.redirect('../reference');
  }
})

router.post('/application/overseas-check', function (req, res) {
  if (req.session.data['overseas-check'] == 'Yes') {
    res.redirect('overseas-approved-check');
  } else {
    res.redirect('declaration');
  }
})

router.post('/application/overseas-approved-check', function (req, res) {
  if (req.session.data['overseas-approved-check'] == 'Yes') {
    req.session.data['overseas'] = true
  } else {
    delete req.session.data['overseas']
  }

  res.redirect('declaration');
})

router.post('/application/declaration', function (req, res) {
  res.redirect('task-list');
})
//
// BEFORE YOU START
/////////////////////////////////////////////////////




/////////////////////////////////////////////////////
// PERSONAL DETAILS
//
router.post('/application/personal/name', function (req, res) {
  req.session.data['personal-details-started'] = 'true'
  req.session.data['personal-details-next'] = 'previous-names-check'

  res.redirect('previous-names-check');
})

router.post('/application/personal/previous-names-check', function (req, res) {
  req.session.data['personal-details-next'] = 'address'

  res.redirect('address');
})

router.post('/application/personal/address', function (req, res) {
  req.session.data['personal-details-next'] = 'contact-preferences'

  res.redirect('contact-preferences');
})

router.post('/application/personal/contact-preferences', function (req, res) {
  req.session.data['personal-details-next'] = 'name-for-correspondence-check'

  res.redirect('name-for-correspondence-check');
})

router.post('/application/personal/name-for-correspondence-check', function (req, res) {
  req.session.data['personal-details-next'] = 'hmrc'

  res.redirect('hmrc');
})

router.post('/application/personal/hmrc', function (req, res) {
  req.session.data['personal-details-next'] = 'check-your-answers'

  res.redirect('check-your-answers');
})

router.post('/application/personal/ni-number', function (req, res) {
  req.session.data['personal-details-next'] = 'check-your-answers'

  res.redirect('check-your-answers');
})

router.get('/application/personal/personal-complete', function (req, res) {
  req.session.data['personal-details-completed'] = 'true'

  res.redirect('../task-list');
})

//
// PERSONAL DETAILS
/////////////////////////////////////////////////////




/////////////////////////////////////////////////////
// BIRTH / ADOPTION
//
router.post('/application/birth-adoption/name', function (req, res) {
  req.session.data['birth-adoption-started'] = 'true'
  req.session.data['birth-adoption-next'] = 'sex'

  res.redirect('sex');
})

router.post('/application/birth-adoption/sex', function (req, res) {
  req.session.data['birth-adoption-next'] = 'dob'

  res.redirect('dob');
})

router.post('/application/birth-adoption/dob', function (req, res) {
  req.session.data['birth-adoption-next'] = 'uk-check'

  res.redirect('uk-check');
})

router.post('/application/birth-adoption/uk-check', function (req, res) {
  if (req.session.data['uk-check'] == 'No') {
    req.session.data['birth-adoption-next'] = 'country'

    res.redirect('country');
  } else {
    req.session.data['birth-adoption-next'] = 'place-of-birth'

    res.redirect('place-of-birth');
  }
})

router.post('/application/birth-adoption/place-of-birth', function (req, res) {
  req.session.data['birth-adoption-next'] = 'check-your-answers'

  res.redirect('mothers-name');
})

router.post('/application/birth-adoption/country', function (req, res) {
  req.session.data['birth-adoption-next'] = 'check-your-answers'

  res.redirect('check-your-answers');
})

router.post('/application/birth-adoption/mothers-name', function (req, res) {
  req.session.data['birth-adoption-next'] = 'fathers-name-check'

  res.redirect('fathers-name-check');
})

router.post('/application/birth-adoption/fathers-name-check', function (req, res) {
  if (req.session.data['fathers-name-check'] == 'No') {
    req.session.data['birth-adoption-next'] = 'adopted'

    res.redirect('adopted');
  } else {
    req.session.data['birth-adoption-next'] = 'fathers-name'

    res.redirect('fathers-name');
  }
})

router.post('/application/birth-adoption/fathers-name', function (req, res) {
  req.session.data['birth-adoption-next'] = 'adopted'

  res.redirect('adopted');
})

router.post('/application/birth-adoption/adopted', function (req, res) {
  req.session.data['birth-adoption-next'] = 'forces'

  res.redirect('forces');
})

router.post('/application/birth-adoption/forces', function (req, res) {
  req.session.data['birth-adoption-next'] = 'check-your-answers'

  res.redirect('check-your-answers');
})

router.get('/application/birth-adoption/birth-adoption-complete', function (req, res) {
  req.session.data['birth-adoption-completed'] = 'true'

  res.redirect('../task-list');
})
//
// BIRTH / ADOPTION
/////////////////////////////////////////////////////




/////////////////////////////////////////////////////
// MARRIAGE / CIVIL PARTNERSHIP
//
router.post('/application/marriage-civil-partnership/current-check', function (req, res) {
  req.session.data['marriage-started'] = 'true'

  if (req.session.data['current-check'] == 'Neither') {
    req.session.data['marriage-next'] = 'partner-died'

    res.redirect('partner-died');
  } else {
    req.session.data['marriage-next'] = 'stay-together'

    res.redirect('stay-together');
  }
})

router.post('/application/marriage-civil-partnership/partner-died', function (req, res) {
  req.session.data['marriage-next'] = 'ended-check'

  res.redirect('ended-check');
})

router.post('/application/marriage-civil-partnership/ended-check', function (req, res) {
  req.session.data['marriage-next'] = 'check-your-answers'

  res.redirect('check-your-answers');
})

router.post('/application/marriage-civil-partnership/stay-together', function (req, res) {
  if (req.session.data['stay-together'] == 'No') {
    req.session.data['marriage-next'] = 'interim-check'

    res.redirect('interim-check');
  } else {
    req.session.data['marriage-next'] = 'partner-agrees'

    res.redirect('partner-agrees');
  }
})

router.post('/application/marriage-civil-partnership/partner-agrees', function (req, res) {
  if (req.session.data['partner-agrees'] == 'No') {
    req.session.data['marriage-next'] = 'interim-check'

    res.redirect('interim-check');
  } else {
    req.session.data['marriage-next'] = 'check-your-answers'

    res.redirect('check-your-answers');
  }
})

router.post('/application/marriage-civil-partnership/interim-check', function (req, res) {
    req.session.data['marriage-next'] = 'check-your-answers'

    res.redirect('check-your-answers');
})

router.get('/application/marriage-civil-partnership/marriage-complete', function (req, res) {
  req.session.data['marriage-completed'] = 'true'

  res.redirect('../task-list');
})
//
// MARRIAGE / CIVIL PARTNERSHIP
/////////////////////////////////////////////////////








/////////////////////////////////////////////////////
// MEDICAL REPORTS
//
router.post('/application/medical-reports/upload', function (req, res) {
  req.session.data['medical-reports-completed'] = 'true'

  res.redirect('../task-list');
})
//
// MEDICAL REPORTS
/////////////////////////////////////////////////////





/////////////////////////////////////////////////////
// EVIDENCE
//
router.post('/application/evidence/upload', function (req, res) {
  req.session.data['evidence-completed'] = 'true'

  res.redirect('../task-list');
})
//
// EVIDENCE
/////////////////////////////////////////////////////





/////////////////////////////////////////////////////
// NAME CHANGE
//
router.post('/application/name-change/upload', function (req, res) {
  req.session.data['name-change-completed'] = 'true'

  res.redirect('../task-list');
})
//
// NAME CHANGE
/////////////////////////////////////////////////////






/////////////////////////////////////////////////////
// PAYMENT
//
router.post('/application/payment/method', function (req, res) {
  if (req.session.data['payment-method'] == 'Help') {
    res.redirect('help-type');
  } else {
    res.redirect('check-your-answers');
  }
})

router.post('/application/payment/help-type', function (req, res) {
  res.redirect('check-your-answers');
})

router.post('/application/payment/payment-details', function (req, res) {
  res.redirect('payment-confirmation');
})
//
// PAYMENT
/////////////////////////////////////////////////////









// Add your routes above the module.exports line
module.exports = router
