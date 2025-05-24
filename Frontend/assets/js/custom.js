$(document).ready(function () {
  $("main#spapp > section").height($(document).height());

  var app = $.spapp({
    defaultView: "#view_main",
    templateDir: "./tpl/",
    pageNotFound: "error_404",
  });

  app.route({
    view: "view_login",
    load: "view_login.html",
  });

  app.route({
    view: "view_register",
    load: "view_register.html",
  });

  app.route({
    view: "view_dogs",
    load: "view_dogs.html",
  });

  app.run();
});
