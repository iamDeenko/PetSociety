<?php

require_once __DIR__ . '/../Services/AdminService.php';


Flight::route('GET /admin/smth', function () {
    echo "TEST";
});




// GET //

Flight::route('GET /admin/product/@id', function ($id){
    $service = new ProductService();
    Flight::json($service->getById($id));
});

Flight::route('GET /admin/products/@category/@subcategory', function ($category_name, $subcategory_name){
    $service = new ProductService();
    Flight::json(print_r($service->getBySubcategory($category_name, $subcategory_name)));
});

Flight::route('GET /admin/user/@id', function ($id) {
    $service = new AdminService();
    if($service->getById($id)){
        Flight::json(print_r($service->getById($id)));
    } else{
        echo "NOT FOUND";
    }
});

Flight::route('GET /admin/user/@id/orders', function ($id){
    $service = new AdminService();
    Flight::json(print_r($service->getUserOrders($id)));
});

Flight::route('GET /admin/users', function () {
    $service = new AdminService();
    Flight::json(print_r($service->getAllUsers()));
});


// POST //

Flight::route('POST /admin/product/new', function ($data = [], ){
    $service = new ProductService();
    if($data != empty($data)){
        $service->createProduct($data);
    }
});



// PUT //


Flight::route('PUT /admin/product/@id', function ($id, $data = []){
    $service = new ProductService();
    if($service->getById($id)){
        if($data != empty($data)){
            $service->updateProduct($id, $data);
        }
    }
});


// DELETE //

Flight::route('DELETE /admin/product/@id', function($id){
    $service = new ProductService();

    if($service->getById($id)){
        if($service->delete($id)){
            echo "DELETED!";
        }
    }
});

Flight::route('DELETE /admin/user/@id', function ($id){
   $service = new AdminService();
   if($service->getById($id)){
       $service->deleteUser($id);
   }
});