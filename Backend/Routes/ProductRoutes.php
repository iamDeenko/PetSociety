<?php


require_once __DIR__ . '/../Services/ProductService.php';
require_once __DIR__ . '/../Services/UserService.php';




// SHOP ROUTES //



// GET //


// Get all from shop //

/**
 * @OA\Get(
 *     path="/shop",
 *     tags={"shop"},
 *     summary="Get all products",
 *     description="Retrieve all products available in the pet store.",
 *     @OA\Response(response=200, description="Products retrieved successfully."),
 *     @OA\Response(response=500, description="Internal server error.")
 * )
 */
Flight::route('GET /shop', function () {
   $service = new ProductService();
   Flight::json($service->getAllProducts());
});



/**
 * @OA\Get(
 *     path="/shop/product/{id}",
 *     tags={"shop"},
 *     summary="Get product by ID",
 *     description="Retrieve detailed information about a specific product.",
 *     @OA\Parameter(name="id", in="path", required=true, description="Product ID", @OA\Schema(type="integer", example=1)),
 *     @OA\Response(response=200, description="Product details retrieved successfully."),
 *     @OA\Response(response=404, description="Product not found."),
 *     @OA\Response(response=500, description="Internal server error.")
 * )
 */
Flight::route('GET /shop/product/@id', function ($product_id) {
   $service = new ProductService();
   Flight::json($service->getProductInfoByID($product_id));
});




/**
 * @OA\Get(
 *     path="/shop/pets/{product_id}",
 *     tags={"shop"},
 *     summary="Get pet details",
 *     description="Retrieve detailed information about a specific pet for adoption.",
 *     @OA\Parameter(name="product_id", in="path", required=true, description="Pet product ID", @OA\Schema(type="integer", example=1)),
 *     @OA\Response(response=200, description="Pet details retrieved successfully."),
 *     @OA\Response(response=404, description="Pet not found."),
 *     @OA\Response(response=500, description="Internal server error.")
 * )
 */
Flight::route('GET /shop/pets/@product_id', function ($product_id) {
   $service = new ProductService();
   Flight::json($service->getPetDetails($product_id));
});


/**
 * @OA\Get(
 *     path="/shop/toys/{product_id}",
 *     tags={"shop"},
 *     summary="Get pet toy details",
 *     description="Retrieve detailed information about a specific pet toy.",
 *     @OA\Parameter(name="product_id", in="path", required=true, description="Toy product ID", @OA\Schema(type="integer", example=1)),
 *     @OA\Response(response=200, description="Pet toy details retrieved successfully."),
 *     @OA\Response(response=404, description="Pet toy not found."),
 *     @OA\Response(response=500, description="Internal server error.")
 * )
 */
Flight::route('GET /shop/toys/@product_id', function ($product_id) {
   $service = new ProductService();
   Flight::json($service->getToyDetails($product_id));
});



/**
 * @OA\Get(
 *     path="/shop/accessories/{product_id}",
 *     tags={"shop"},
 *     summary="Get pet accessory details",
 *     description="Retrieve detailed information about a specific pet accessory.",
 *     @OA\Parameter(name="product_id", in="path", required=true, description="Accessory product ID", @OA\Schema(type="integer", example=1)),
 *     @OA\Response(response=200, description="Pet accessory details retrieved successfully."),
 *     @OA\Response(response=404, description="Pet accessory not found."),
 *     @OA\Response(response=500, description="Internal server error.")
 * )
 */
Flight::route('GET /shop/accessories/@product_id', function ($product_id) {
   $service = new ProductService();
   Flight::json($service->getAccessoryDetails($product_id));
});


/**
 * @OA\Get(
 *     path="/shop/food/{product_id}",
 *     tags={"shop"},
 *     summary="Get pet food details",
 *     description="Retrieve detailed information about a specific pet food product.",
 *     @OA\Parameter(name="product_id", in="path", required=true, description="Food product ID", @OA\Schema(type="integer", example=1)),
 *     @OA\Response(response=200, description="Pet food details retrieved successfully."),
 *     @OA\Response(response=404, description="Pet food not found."),
 *     @OA\Response(response=500, description="Internal server error.")
 * )
 */
Flight::route('GET /shop/food/@product_id', function ($product_id) {
   $service = new ProductService();
   Flight::json($service->getFoodDetails($product_id));
});


// Get by Category //

/**
 * @OA\Get(
 *     path="/shop/{category_name}",
 *     tags={"shop"},
 *     summary="Get products by category",
 *     description="Retrieve all products in a specific category (pets, toys, accessories, food).",
 *     @OA\Parameter(name="category_name", in="path", required=true, description="Category name", @OA\Schema(type="string", example="pets")),
 *     @OA\Response(response=200, description="Products in category retrieved successfully."),
 *     @OA\Response(response=404, description="Category not found."),
 *     @OA\Response(response=500, description="Internal server error.")
 * )
 */
Flight::route('GET /shop/@category_name', function ($category_name) {
   $service = new ProductService();
   Flight::json($service->getByCategory($category_name));
});
