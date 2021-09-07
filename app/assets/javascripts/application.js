/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

$(document).ready(function () {
  window.GOVUKFrontend.initAll()
  window.MOJFrontend.initAll()
})


// Turn off autocomplete on all forms and inputs
$(".form").attr("autocomplete", "off");
$(".govuk-input").attr("autocomplete", "off");


// Initialise MOJ multi file upload
if(typeof MOJFrontend.MultiFileUpload !== 'undefined') {
  new MOJFrontend.MultiFileUpload({
    container: $('.moj-multi-file-upload'),
    uploadUrl: '/ajax-upload-url',
    deleteUrl: '/ajax-delete-url'
  });
}
