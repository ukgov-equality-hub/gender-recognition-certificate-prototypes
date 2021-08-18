/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

$(document).ready(function () {
  window.GOVUKFrontend.initAll()
})


// Turn off autocomplete on all forms and inputs
$(".form").attr("autocomplete", "off");
$(".govuk-input").attr("autocomplete", "off");
