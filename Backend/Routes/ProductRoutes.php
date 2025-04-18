<?php


require_once __DIR__ . '/../Services/ProductService.php';
require_once __DIR__ . '/../Services/UserService.php';




// GET ROUTES //



Flight::route('GET /shop', function(){
   $service = new ProductService();
    print_r($service->getAllProducts());
});

Flight::route('GET /shop/@category_name/@id', function ($category_name, $id){
   $service = new ProductService();
   Flight::json($service->getBy($category_name,$id));
});


Flight::route('GET /shop/@category_name', function($category_name){
    $service = new ProductService();
    print_r($service->getByCategory($category_name));
});










// ADMIN ROUTES

Flight::route('GET /admin/@category', function ($category){
    $service = Factory::make_by_category_ADMIN($category);
    Flight::json(print_r($service->getAll()));
});

Flight::route('GET /admin/@category/@subcategory', function ($category_name, $subcategory_name){
    $service = Factory::make_by_category_ADMIN($category_name);
    Flight::json(print_r($service->getBySubcategory($category_name, $subcategory_name)));
});

Flight::route('GET /admin/users/@id', function ($id){
    $service = new UserService();
    Flight::json($service->getUserOrders($id));
});




// POST routes


Flight::route('POST /register', function(){
    echo "ECHO ECHO";
});





