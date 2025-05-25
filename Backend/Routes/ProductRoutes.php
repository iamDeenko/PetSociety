<?php


require_once __DIR__ . '/../Services/ProductService.php';
require_once __DIR__ . '/../Services/UserService.php';




// SHOP ROUTES //



// GET //


// Get all from shop //

Flight::route('GET /shop', function () {
   $service = new ProductService();
   Flight::json($service->getAllProducts());
});




// Get by Category //

Flight::route('GET /shop/@category_name', function ($category_name) {
   $service = new ProductService();
   Flight::json($service->getByCategory($category_name));
});


Flight::route('GET /shop/subcategory/@subcategory_name', function ($subcategory_name) {
   $service = new ProductService();
   Flight::json($service->getProductsInSubcategory($subcategory_name));
});
