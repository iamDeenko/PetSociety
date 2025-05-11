<?php

require_once __DIR__ . '/../Services/AdminService.php';





// GET //

Flight::route('GET /admin/product/@id', function ($id){
    $service = new ProductService();
    Flight::json($service->getById($id));
});


Flight::route('GET /admin/@category', function ($category_name){
    $service = new ProductService();
    Flight::json($service->getByCategory($category_name));
});



Flight::route('GET /admin/user/@id', function ($id) {
    $service = new AdminService();
    
    if($service->getById($id)){
        Flight::json($service->getById($id));
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


    Flight::json($service->getAllUsers());
});


// POST T// 

Flight::route('POST /admin/product/new', function ($data = [], ){
    $service = new ProductService();

    $request = Flight::request();

    $productData = $request->data->getData();

    if (empty($productData)) {
        Flight::halt(400, Flight::json(['error' => 'Bad Request: No product data received or invalid format.']));
        return; // Stop execution
    }

    try {
        $newProduct = $service->createProduct($productData); 

        Flight::json($newProduct, 201); 
        

    } catch (InvalidArgumentException $e) { 
        Flight::halt(400, Flight::json(['error' => 'Bad Request: ' . $e->getMessage()]));
    } catch (Exception $e) { 

        Flight::halt(500, Flight::json(['error' => 'Internal Server Error: Could not create product.']));
    }
});



// PUT //


Flight::route('PUT /admin/product/@id', function ($id){
    $service = new ProductService();
    $request = Flight::request();


    $updateData = $request->data->getData();

    if (empty($updateData)) {
        Flight::halt(400, Flight::json(['success' => false, 'message' => 'Bad Request: No update data provided in the request body.']));
        return; 
    }


    if (empty($id) || !ctype_digit((string)$id)) { 
         Flight::halt(400, Flight::json(['success' => false, 'message' => 'Bad Request: Invalid or missing product ID.']));
        return;
    }
    $productId = (int)$id;


    $existingProduct = $service->getById($productId);
    if (empty($existingProduct)) { 
        Flight::halt(404, Flight::json(['success' => false, 'message' => 'Product not found.']));
        return;
    }


    try {
        $success = $service->update($productId, $updateData); 

    } catch (Exception $e) {

        error_log($e->getMessage());
   
    }
});



// DELETE //

Flight::route('DELETE /admin/product/@id', function($id){
    $service = new ProductService();

    if($service->getById($id)){
        if($service->delete($id)){
            Flight::json(["status" => "success", "message" => "Product deleted successfully."]);
        }
    }
});

Flight::route('DELETE /admin/user/@id', function ($id){
   $service = new AdminService();
   if($service->getById($id)){
       $service->deleteUser($id);
   }
});