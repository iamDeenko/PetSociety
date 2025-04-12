<?php

require_once "Services/ProductService.php";


$productService = new ProductService();

$res = $productService->getAllAccessorries();

print_r($res);

?>