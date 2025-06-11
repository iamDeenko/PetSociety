<?php


require_once __DIR__ . '/../Services/CategoryService.php';


/**
 * @OA\Get(
 *     path="/subcategory/{category_id}",
 *     tags={"categories"},
 *     summary="Get subcategories by category ID",
 *     description="Retrieve all subcategories for a specific category.",
 *     @OA\Parameter(name="category_id", in="path", required=true, description="Category ID", @OA\Schema(type="integer", example=1)),
 *     @OA\Response(response=200, description="Subcategories retrieved successfully."),
 *     @OA\Response(response=404, description="Category not found."),
 *     @OA\Response(response=500, description="Internal server error.")
 * )
 */
Flight::route('GET /subcategory/@category_id', function ($category_id) {
    $service = new CategoryService();
    Flight::json($service->getSubcategoriesFromCategoryID($category_id));
});



/**
 * @OA\Get(
 *     path="/subcategories/all",
 *     tags={"categories"},
 *     summary="Get all subcategories",
 *     description="Retrieve all available subcategories in the pet store.",
 *     @OA\Response(response=200, description="All subcategories retrieved successfully."),
 *     @OA\Response(response=500, description="Internal server error.")
 * )
 */
Flight::route('GET /subcategories/all', function () {
    $service = new CategoryService();
    Flight::json($service->loadAllSubcategories());
});

/**
 * @OA\Get(
 *     path="/subcategory-items/{subcategory_name}",
 *     tags={"categories"},
 *     summary="Get products in subcategory",
 *     description="Retrieve all products in a specific subcategory.",
 *     @OA\Parameter(name="subcategory_name", in="path", required=true, description="Subcategory name", @OA\Schema(type="string", example="dog-toys")),
 *     @OA\Response(response=200, description="Products in subcategory retrieved successfully."),
 *     @OA\Response(response=404, description="Subcategory not found."),
 *     @OA\Response(response=500, description="Internal server error.")
 * )
 */
Flight::route('GET /subcategory-items/@subcategory_name', function ($subcategory_name) {
    $service = new ProductService();
    Flight::json($service->getProductsInSubcategory($subcategory_name));
});
