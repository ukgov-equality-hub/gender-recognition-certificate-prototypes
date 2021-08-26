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
// router.post('/eligibility/age-check', function (req, res) {
//   if (req.session.data['age-check'] == 'No') {
//     res.redirect('not-old-enough');
//   } else {
//     res.redirect('overseas-check');
//   }
// })
//
// router.post('/eligibility/overseas-check', function (req, res) {
//   if (req.session.data['overseas-check'] == 'Yes') {
//     res.redirect('overseas-approved-check');
//   } else {
//     res.redirect('dysphoria-check');
//   }
// })
//
// router.post('/eligibility/overseas-approved-check', function (req, res) {
//   if (req.session.data['overseas-approved-check'] == 'Yes') {
//     res.redirect('overseas-track');
//   } else {
//     res.redirect('dysphoria-check');
//   }
// })
//
// router.post('/eligibility/dysphoria-check', function (req, res) {
//   if (req.session.data['dysphoria-check'] == 'No') {
//     res.redirect('dysphoria-no');
//   } else {
//     res.redirect('two-years-check');
//   }
// })
//
// router.post('/eligibility/two-years-check', function (req, res) {
//   if (req.session.data['two-years-check'] == 'No') {
//     res.redirect('two-years-no');
//   } else {
//     res.redirect('until-death-check');
//   }
// })
//
// router.post('/eligibility/until-death-check', function (req, res) {
//   if (req.session.data['until-death-check'] == 'No') {
//     res.redirect('until-death-no');
//   } else {
//     res.redirect('../save-and-return/start-application');
//   }
// })
//
// ELIGIBILITY
/////////////////////////////////////////////////////




/////////////////////////////////////////////////////
// BEFORE YOU START
//
router.post('/declaration', function (req, res) {
  res.redirect('save-and-return/start-application');
})

router.post('/save-and-return/start-application', function (req, res) {
  res.redirect('../task-list');
})
//
// BEFORE YOU START
/////////////////////////////////////////////////////




/////////////////////////////////////////////////////
// MARRIAGE / CIVIL PARTNERSHIP
//
router.post('/marriage-civil-partnership/current-check', function (req, res) {
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

router.post('/marriage-civil-partnership/partner-died', function (req, res) {
  req.session.data['marriage-next'] = 'ended-check'

  res.redirect('ended-check');
})

router.post('/marriage-civil-partnership/ended-check', function (req, res) {
  req.session.data['marriage-next'] = 'check-your-answers'

  res.redirect('check-your-answers');
})





// MARRIAGE
router.post('/marriage-civil-partnership/stay-together', function (req, res) {
  if (req.session.data['stay-together'] == 'No') {
    req.session.data['marriage-next'] = 'interim-check'

    res.redirect('interim-check');
  } else {
    req.session.data['marriage-next'] = 'partner-agrees'

    res.redirect('partner-agrees');
  }
})

router.post('/marriage-civil-partnership/partner-agrees', function (req, res) {
  if (req.session.data['partner-agrees'] == 'No') {
    req.session.data['marriage-next'] = 'interim-check'

    res.redirect('interim-check');
  } else {
    req.session.data['marriage-next'] = 'check-your-answers'

    res.redirect('check-your-answers');
  }
})




//CIVIL PARTNERSHIP
router.post('/marriage-civil-partnership/protected-civil-partnership', function (req, res) {
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

router.post('/marriage-civil-partnership/same-time', function (req, res) {
  if (req.session.data['same-time'] == 'No') {
    req.session.data['marriage-next'] = 'interim-check'

    res.redirect('interim-check');
  } else {
    req.session.data['marriage-next'] = 'check-your-answers'

    res.redirect('check-your-answers');
  }
})





router.post('/marriage-civil-partnership/interim-check', function (req, res) {
  if (req.session.data['interim-check'] == 'No') {
    res.redirect('interim-no');
  } else {
    req.session.data['marriage-next'] = 'check-your-answers'

    res.redirect('check-your-answers');
  }
})

router.get('/marriage-civil-partnership/marriage-complete', function (req, res) {
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
// PERSONAL DETAILS
//
router.post('/personal/name', function (req, res) {
  req.session.data['personal-details-started'] = 'true'
  req.session.data['personal-details-next'] = 'name-for-correspondence-check'

  res.redirect('previous-names-check');
})

router.post('/personal/previous-names-check', function (req, res) {
  req.session.data['personal-details-next'] = 'name-for-correspondence-check'

  res.redirect('name-for-correspondence-check');
})

router.post('/personal/name-for-correspondence-check', function (req, res) {
  if (req.session.data['name-for-correspondence-check'] == 'No') {
    req.session.data['personal-details-next'] = 'address'

    res.redirect('address');
  } else {
    req.session.data['personal-details-next'] = 'name-for-correspondence'

    res.redirect('name-for-correspondence');
  }
})

router.post('/personal/name-for-correspondence', function (req, res) {
  req.session.data['personal-details-next'] = 'address'

  res.redirect('address');
})

router.post('/personal/address', function (req, res) {
  req.session.data['personal-details-next'] = 'contact-preferences'

  res.redirect('contact-preferences');
})

router.post('/personal/contact-preferences', function (req, res) {
  req.session.data['personal-details-next'] = 'hmrc'

  res.redirect('hmrc');
})

router.post('/personal/hmrc', function (req, res) {
  if (req.session.data['notify-hmrc'] == 'No') {
    req.session.data['personal-details-next'] = 'check-your-answers'

    res.redirect('check-your-answers');
  } else {
    req.session.data['personal-details-next'] = 'ni-number'

    res.redirect('ni-number');
  }
})

router.post('/personal/ni-number', function (req, res) {
  req.session.data['personal-details-next'] = 'check-your-answers'

  res.redirect('check-your-answers');
})

router.get('/personal/personal-complete', function (req, res) {
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
// BIRTH / ADOPTION
//
// router.post('/birth-adoption/name', function (req, res) {
//   req.session.data['birth-adoption-next'] = 'check-your-answers'
//
//   res.redirect('sex');
// })
//
// router.post('/birth-adoption/sex', function (req, res) {
//   req.session.data['birth-adoption-next'] = 'check-your-answers'
//
//   res.redirect('dob');
// })
//
// router.post('/birth-adoption/dob', function (req, res) {
//   req.session.data['birth-adoption-next'] = 'check-your-answers'
//
//   res.redirect('uk-check');
// })
//
// router.post('/birth-adoption/uk-check', function (req, res) {
//   if (req.session.data['uk-check'] == 'No') {
//     req.session.data['birth-adoption-next'] = 'check-your-answers'
//
//     res.redirect('country');
//   } else {
//     req.session.data['birth-adoption-next'] = 'check-your-answers'
//
//     res.redirect('mothers-name');
//   }
// })
//
// router.post('/birth-adoption/country', function (req, res) {
//   req.session.data['birth-adoption-next'] = 'check-your-answers'
//
//   res.redirect('../payment/help-check');
// })
//
// router.post('/birth-adoption/mothers-name', function (req, res) {
//   req.session.data['birth-adoption-next'] = 'check-your-answers'
//
//   res.redirect('fathers-name-check');
// })
//
// router.post('/birth-adoption/fathers-name-check', function (req, res) {
//   if (req.session.data['fathers-name-check'] == 'No') {
//     req.session.data['birth-adoption-next'] = 'check-your-answers'
//
//     res.redirect('place-of-birth');
//   } else {
//     req.session.data['birth-adoption-next'] = 'check-your-answers'
//
//     res.redirect('fathers-name');
//   }
// })
//
// router.post('/birth-adoption/fathers-name', function (req, res) {
//   req.session.data['birth-adoption-next'] = 'check-your-answers'
//
//   res.redirect('place-of-birth');
// })
//
// router.post('/birth-adoption/place-of-birth', function (req, res) {
//   req.session.data['birth-adoption-next'] = 'check-your-answers'
//
//   res.redirect('adopted');
// })
//
// router.post('/birth-adoption/adopted', function (req, res) {
//   req.session.data['birth-adoption-next'] = 'check-your-answers'
//
//   res.redirect('forces');
// })
//
// router.post('/birth-adoption/forces', function (req, res) {
//   req.session.data['birth-adoption-next'] = 'check-your-answers'
//
//   res.redirect('../payment/help-check');
// })
//
// BIRTH / ADOPTION
/////////////////////////////////////////////////////






/////////////////////////////////////////////////////
// MEDICAL REPORTS
//
router.post('/medical-reports/upload', function (req, res) {
  req.session.data['medical-reports-started'] = 'true'

  res.redirect('upload');
})

router.get('/medical-reports/medical-reports-complete', function (req, res) {
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
router.post('/evidence/upload', function (req, res) {
  req.session.data['evidence-started'] = 'true'

  res.redirect('upload');
})

router.get('/evidence/evidence-complete', function (req, res) {
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
router.post('/name-change/upload', function (req, res) {
  req.session.data['name-change-started'] = 'true'

  res.redirect('upload');
})

router.get('/name-change/name-change-complete', function (req, res) {
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
router.post('/payment/help-check', function (req, res) {
  if (req.session.data['help-check'] == 'Yes') {
    res.redirect('help-type');
  } else {
    res.redirect('method');
  }
})

router.post('/payment/help-type', function (req, res) {
  res.redirect('check-your-answers');
})

router.post('/payment/method', function (req, res) {
  res.redirect('check-your-answers');
})

router.post('/payment/payment-details', function (req, res) {
  res.redirect('payment-confirmation');
})
//
// PAYMENT
/////////////////////////////////////////////////////









// Add your routes above the module.exports line
module.exports = router
