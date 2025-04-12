<?php

require_once "Services/ProductService.php";


$productService = new ProductService();

$res = $productService->getOneByName('Test Doggo');

print_r($res);

?>