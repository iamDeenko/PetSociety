<?php

const WORKING_3 = "Working!!3!";
require_once __DIR__ . '/../Services/ProductService.php';






// GET ROUTES //

Flight::route('GET /t', function () {
   echo "WORKING!";
});


Flight::route('GET /shop', function(){
   $service = new ProductService();
   Flight::json($service->getAll());
});


Flight::route('GET /shop/pets', function () {
    $service = new ProductService();
    Flight::json($service->getAllPets());
});


Flight::route('GET /shop/toys', function () {
    $service = new ProductService();
    Flight::json($service->getAllToys());
});

Flight::route('GET /shop/food', function () {
    $service = new ProductService();
    Flight::json($service->getAllFood());
});

Flight::route('GET /shop/accessories', function () {
    $service = new ProductService();
    Flight::json($service->getAllAccessories());
});


Flight::route('GET /shop/toys/@id', function($id) {
    $service = new ProductService();
    Flight::json($service->getToyById($id));
});

Flight::route('GET /shop/accessories/@id', function($id) {
    $service = new ProductService();
    Flight::json($service->getAccessoryById($id));
});

Flight::route('GET /shop/food/@id', function($id) {
    $service = new ProductService();
    Flight::json($service->getFoodById($id));
});

Flight::route('GET /shop/pets/@id', function($id) {
    $service = new ProductService();
    Flight::json($service->getPetById($id));
});



// DELETE routes
Flight::route('DELETE /shop/pets/@id', function($id) {
    $service = new ProductService();
    $result = $service->delete($id);

    if ($result) {
        Flight::json([
            'status' => 'success',
            'message' => "Deleted product with ID $id"
        ]);
    } else {
        Flight::json([
            'status' => 'error',
            'message' => "Failed to delete product with ID $id"
        ], 500);
    }
});