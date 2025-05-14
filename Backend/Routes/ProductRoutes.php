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



// Get specific product //

Flight::route('GET /shop/@category_name/@id', function ($category_name, $id) {
   $service = new ProductService();
   Flight::json($service->getBy($category_name, $id));
});


// Get by Category //

Flight::route('GET /shop/@category_name', function ($category_name) {
   $service = new ProductService();
   Flight::json($service->getByCategory($category_name));
});
