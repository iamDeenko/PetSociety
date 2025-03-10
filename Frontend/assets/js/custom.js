$(document).ready(function() {



  var app = $.spapp({pageNotFound : 'error_404'}); // initialize

  // define routes
  app.route({
    view: 'view_main',
    load:"view_main.html"
  });


  // run app
  app.run();

});