$(document).ready(function() {



    var app = $.spapp({
        defaultView  : "#view_main",
        templateDir  : "./tpl/",
        pageNotFound : "error_404"
    });

  // define routes
  app.route(
      {
                view: 'view_main',
                load:"view_main.html"
            },
            {
                view : 'view_shop',
                load:'view_shop.html'
            }
            );

  // run app
  app.run();

});