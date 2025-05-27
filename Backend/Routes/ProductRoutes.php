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



Flight::route('GET /shop/product/@id', function ($product_id) {
   $service = new ProductService();
   Flight::json($service->getProductInfoByID($product_id));
});




Flight::route('GET /shop/pets/@product_id', function ($product_id) {
   $service = new ProductService();
   Flight::json($service->getPetDetails($product_id));
});


Flight::route('GET /shop/toys/@product_id', function ($product_id) {
   $service = new ProductService();
   Flight::json($service->getToyDetails($product_id));
});



Flight::route('GET /shop/accessories/@product_id', function ($product_id) {
   $service = new ProductService();
   Flight::json($service->getAccessoryDetails($product_id));
});


Flight::route('GET /shop/food/@product_id', function ($product_id) {
   $service = new ProductService();
   Flight::json($service->getFoodDetails($product_id));
});


// Get by Category //

Flight::route('GET /shop/@category_name', function ($category_name) {
   $service = new ProductService();
   Flight::json($service->getByCategory($category_name));
});

