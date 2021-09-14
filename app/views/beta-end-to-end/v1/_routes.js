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


// Clear session data on apply page
router.get('/guidance/apply', function (req, res, next) {
  req.session.destroy()
  next()
})





/////////////////////////////////////////////////////
// BEFORE YOU START
//
router.post('/application/declaration', function (req, res) {
  res.redirect('save-and-return/start-application');
})

router.post('/application/save-and-return/start-application', function (req, res) {
  res.redirect('../task-list');
})
//
// BEFORE YOU START
/////////////////////////////////////////////////////




/////////////////////////////////////////////////////
// PERSONAL DETAILS
//
router.post('/application/personal/name', function (req, res) {
  req.session.data['personal-details-started'] = 'true'
  req.session.data['personal-details-next'] = 'name-for-correspondence-check'

  res.redirect('name-for-correspondence-check');
})

router.post('/application/personal/name-for-correspondence-check', function (req, res) {
  if (req.session.data['name-for-correspondence-check'] == 'No') {
    req.session.data['personal-details-next'] = 'previous-names-check'

    res.redirect('previous-names-check');
  } else {
    req.session.data['personal-details-next'] = 'name-for-correspondence'

    res.redirect('name-for-correspondence');
  }
})

router.post('/application/personal/name-for-correspondence', function (req, res) {
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
  req.session.data['personal-details-next'] = 'hmrc'

  res.redirect('hmrc');
})

router.post('/application/personal/hmrc', function (req, res) {
  // if (req.session.data['notify-hmrc'] == 'No') {
  //   req.session.data['personal-details-next'] = 'check-your-answers'
  //
  //   res.redirect('check-your-answers');
  // } else {
  //   req.session.data['personal-details-next'] = 'ni-number'
  //
  //   res.redirect('ni-number');
  // }
  req.session.data['personal-details-next'] = 'check-your-answers'

  res.redirect('check-your-answers');
})

router.post('/application/personal/ni-number', function (req, res) {
  req.session.data['personal-details-next'] = 'check-your-answers'

  res.redirect('check-your-answers');
})

router.get('/application/personal/personal-complete', function (req, res) {
  if (req.session.data['personal-details-completed'] != 'true') {
    req.session.data['tasks-completed']++
    if (req.session.data['previous-names-check'] == 'Yes') {
      req.session.data['tasks-total']++
    }
  }

  req.session.data['personal-details-completed'] = 'true'


  res.redirect('../task-list');
})

//
// PERSONAL DETAILS
/////////////////////////////////////////////////////




/////////////////////////////////////////////////////
// MARRIAGE / CIVIL PARTNERSHIP
//
router.post('/application/marriage-civil-partnership/current-check', function (req, res) {
  req.session.data['marriage-started'] = 'true'

  if (req.session.data['current-check'] == 'Neither') {
    req.session.data['marriage-next'] = 'partner-died'

    res.redirect('partner-died');
  } else if (req.session.data['current-check'] == 'Civil partnership') {
    req.session.data['marriage-next'] = 'protected-civil-partnership'

    res.redirect('protected-civil-partnership');
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





// MARRIAGE
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




//CIVIL PARTNERSHIP
router.post('/application/marriage-civil-partnership/protected-civil-partnership', function (req, res) {
  if (req.session.data['protected-civil-partnership'] == 'No') {
    req.session.data['marriage-next'] = 'interim-check'

    res.redirect('interim-check');
  } else if (req.session.data['protected-civil-partnership'] == 'Yes, a protected Scottish civil partnership') {
    req.session.data['marriage-next'] = 'same-time'

    res.redirect('same-time');
  } else {
    req.session.data['marriage-next'] = 'stay-together'

    res.redirect('stay-together');
  }
})

router.post('/application/marriage-civil-partnership/same-time', function (req, res) {
  if (req.session.data['same-time'] == 'No') {
    req.session.data['marriage-next'] = 'interim-check'

    res.redirect('interim-check');
  } else {
    req.session.data['marriage-next'] = 'check-your-answers'

    res.redirect('check-your-answers');
  }
})





router.post('/application/marriage-civil-partnership/interim-check', function (req, res) {
  if (req.session.data['interim-check'] == 'No') {
    res.redirect('interim-no');
  } else {
    req.session.data['marriage-next'] = 'check-your-answers'

    res.redirect('check-your-answers');
  }
})

router.get('/application/marriage-civil-partnership/marriage-complete', function (req, res) {
  if (req.session.data['marriage-completed'] != 'true') {
    req.session.data['tasks-completed']++
  }

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
  req.session.data['medical-reports-started'] = 'true'

  res.redirect('upload');
})

router.get('/application/medical-reports/medical-reports-complete', function (req, res) {
  if (req.session.data['medical-reports-completed'] != 'true') {
    req.session.data['tasks-completed']++
  }

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
  req.session.data['evidence-started'] = 'true'

  res.redirect('upload');
})

router.get('/application/evidence/evidence-complete', function (req, res) {
  if (req.session.data['evidence-completed'] != 'true') {
    req.session.data['tasks-completed']++
  }

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
  req.session.data['name-change-started'] = 'true'

  res.redirect('upload');
})

router.get('/application/name-change/name-change-complete', function (req, res) {
  if (req.session.data['name-change-completed'] != 'true') {
    req.session.data['tasks-completed']++
  }

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
  if (req.session.data['payment-method'] == 'I am applying for help paying the fee') {
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
