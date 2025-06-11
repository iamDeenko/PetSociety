<?php


require_once __DIR__ . '/../Services/CategoryService.php';


Flight::route('GET /subcategory/@category_id', function ($category_id) {
    $service = new CategoryService();
    Flight::json($service->getSubcategoriesFromCategoryID($category_id));
});



Flight::route('GET /subcategories/all', function () {
    $service = new CategoryService();
    Flight::json($service->loadAllSubcategories());
});

Flight::route('GET /subcategory-items/@subcategory_name', function ($subcategory_name) {
    $service = new ProductService();
    Flight::json($service->getProductsInSubcategory($subcategory_name));
});
