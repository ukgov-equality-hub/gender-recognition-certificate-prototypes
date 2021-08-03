const express = require('express')
const router = new express.Router()

// Set variables
router.get('*', function(req, res, next){
  // Remove service name on guidance pages
  res.locals['serviceName'] = ''

  // Change the service name URL so it links back this features index
  res.locals['serviceUrl'] = '/'+req.originalUrl.split('/')[1]+'/'

  next()
})





// Add your routes above the module.exports line
module.exports = router
