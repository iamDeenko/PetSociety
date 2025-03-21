$(document).ready(function() {



  var app = $.spapp({
    defaultView: "home",
    templateDir: "./tpl/",
    pageNotFound: "error_404"
  });

  // define routes
  app.route(
    {
      view: 'home',
      load: "view_main.html"
    },
    {
      view: 'shop',
      load: 'view_shop.html'
    }
  );

  // run app
  app.run();

});
