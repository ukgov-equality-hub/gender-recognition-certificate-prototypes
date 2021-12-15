const express = require('express')
const router = new express.Router()

// Set variables
router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Check documents needed to apply for a GRC'

  // Change the service name URL so it links back this features index
  res.locals['serviceUrl'] = '/'+req.originalUrl.split('/')[1]+'/'

  next()
})

// Clear session data on start page
router.get('/start', function (req, res, next) {
  req.session.destroy()
  next()
})



router.post('/previous-names-check', function (req, res) {
  res.redirect('marriage-civil-partnership/current-check');
})

router.post('/marriage-civil-partnership/current-check', function (req, res) {
  if (req.session.data['current-check'] == 'Neither') {
    res.redirect('partner-died');
  } else {
    res.redirect('stay-together');
  }
})

router.post('/marriage-civil-partnership/partner-died', function (req, res) {
  res.redirect('ended-check');
})

router.post('/marriage-civil-partnership/ended-check', function (req, res) {
  res.redirect('../overseas-approved-check');
})

router.post('/marriage-civil-partnership/stay-together', function (req, res) {
  res.redirect('../overseas-approved-check');
})

// router.post('/marriage-civil-partnership/partner-agrees', function (req, res) {
//   if (req.session.data['partner-agrees'] == 'No') {
//     res.redirect('interim-check');
//   } else {
//     res.redirect('../overseas-approved-check');
//   }
// })
//
// router.post('/marriage-civil-partnership/interim-check', function (req, res) {
//   res.redirect('../overseas-approved-check');
// })

router.post('/overseas-approved-check', function (req, res) {
  res.redirect('your-documents');
})






// Add your routes above the module.exports line
module.exports = router
