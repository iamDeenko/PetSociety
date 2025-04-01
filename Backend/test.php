<?php

require_once './Dao/BaseDao.php';
require_once './Dao/ProductDao.php';
require_once './Dao/SubcategoryDao.php';

$productDao = new ProductDao();

$product =  $productDao->getById(2);

echo "<pre>";
print_r($product);
echo "</pre>";