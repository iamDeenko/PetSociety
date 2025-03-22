$(document).ready(function() {
  var app = $.spapp({
    defaultView: "home",
    templateDir: "./tpl/",
    pageNotFound: "error_404",
    historyEnabled: true,
    baseUrl: '/'
  });

  // Main Routes
  app.route({ view: 'home', load: "view_main.html" });
  app.route({ view: 'pets', load: "views/Pets/view_pets.html" });
  app.route({ view: 'accessories', load: "views/Accessories/view_accessories.html" });
  app.route({ view: 'food', load: "views/Food/view_food.html" });
  app.route({ view: 'toys', load: "views/Toys/view_toys.html" });

  // Pets Subcategory Routes
  app.route({ view: 'pets-dogs', load: "views/Pets/Dogs/view_dogs.html" });
  app.route({ view: 'pets-cats', load: "views/Pets/Cats/view_cats.html" });
  app.route({ view: 'pets-small-animals', load: "views/Pets/Small-Animals/view_small_animals.html" });
  app.route({ view: 'pets-birds', load: "views/Pets/Birds/view_birds.html" });
  app.route({ view: 'pets-fish', load: "views/Pets/Fish/view_fish.html" });
  app.route({ view: 'pets-reptiles', load: "views/Pets/Reptiles/view_reptiles.html" });
  app.route({ view: 'pets-amphibians', load: "views/Pets/Amphibians/view_amphibians.html" });

  // Accessories Subcategory Routes
  app.route({ view: 'accessories-leashes', load: "views/Accessories/Leashes/view_leashes.html" });
  app.route({ view: 'accessories-bowls', load: "views/Accessories/Bowls/view_bowls.html" });
  app.route({ view: 'accessories-carriers', load: "views/Accessories/Carriers/view_carriers.html" });
  app.route({ view: 'accessories-grooming-tools', load: "views/Accessories/Grooming-Tools/view_grooming_tools.html" });
  app.route({ view: 'accessories-travel-accessories', load: "views/Accessories/Travel-Accessories/view_travel_accessories.html" });

  // Food Subcategory Routes
  app.route({ view: 'food-dry-food', load: "views/Food/Dry-Food/view_dry_food.html" });
  app.route({ view: 'food-wet-food', load: "views/Food/Wet-Food/view_wet_food.html" });
  app.route({ view: 'food-treats', load: "views/Food/Treats/view_treats.html" });
  app.route({ view: 'food-supplements', load: "views/Food/Supplements/view_supplements.html" });

  // Toys Subcategory Routes
  app.route({ view: 'toys-chewing', load: "views/Toys/Chewing/view_chewing.html" });
  app.route({ view: 'toys-interactive', load: "views/Toys/Interactive/view_interactive.html" });
  app.route({ view: 'toys-fetch-retrieve', load: "views/Toys/Fetch-Retrieve/view_fetch_retrieve.html" });

  app.run();
});
