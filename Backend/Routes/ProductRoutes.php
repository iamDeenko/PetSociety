<?php


require_once __DIR__ . '/../Services/ProductService.php';
require_once __DIR__ . '/../Services/UserService.php';




// SHOP ROUTES //




// GET //

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




// ADMIN ROUTES //

// GET //

Flight::route('GET /admin/product/@id', function ($id){
    $service = Factory::make('product');
    Flight::json($service->getById($id));
});

Flight::route('GET /admin/products/@category/@subcategory', function ($category_name, $subcategory_name){
    $service = Factory::make('product');
    Flight::json(print_r($service->getBySubcategory($category_name, $subcategory_name)));
});

Flight::route('GET /admin/user/@id', function ($id) {
    $service = new UserDao();
    Flight::json(print_r($service->getById($id)));
});

Flight::route('GET /admin/user/@id/orders', function ($id){
    $service = new UserDao();
    Flight::json(print_r($service->getUserOrders($id)));
});

Flight::route('GET /admin/users', function () {
    $service = new UserDao();
    Flight::json(print_r($service->getAll()));
});

