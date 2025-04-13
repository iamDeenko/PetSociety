<?php


require_once __DIR__ . '/../Services/ProductService.php';



// GET ROUTES //

Flight::route('GET /shop', function(){
   $service = new ProductService();
   Flight::json($service->getAll());
});


Flight::route('GET /shop/@category_name/@id', function ($category_name, $id){
   $service = new ProductService();
   Flight::json($service->getBy($category_name,$id));
});


Flight::route('GET /shop/@category_name', function($category_name){
    $service = new ProductService();
    Flight::json($service->getByCategory($category_name));
});


// DELETE routes

Flight::route('DELETE /shop/@category_name/@id', function ($category_name, $id){
   $service = new ProductService();
   echo "SEMPRA";
   $service->deleteBy($category_name, $id);
});

