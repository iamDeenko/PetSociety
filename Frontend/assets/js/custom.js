$(document).ready(function() {



  var app = $.spapp({
    defaultView: "home",
    templateDir: "./tpl/",
    pageNotFound: "error_404",
    historyEnabled: true,
    baseUrl: '/'
  });

  // define routes
  app.route(
    {
      view: 'home',
      load: "views/view_main.html",
    },
    {
      view: 'pets',
      load: 'view_pews.html',
      path: 'views/megatestsemprice'
    },
    {
      view: 'accessories',
      load: 'view_accessories.html'
    }
  );

  // run app
  app.run();

});
