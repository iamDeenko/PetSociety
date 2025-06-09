<?php

use App\Product;
use OpenApi\Annotations\Post;

require_once __DIR__ . '/Dao/ProductDao.php';


$test = new ProductDao();

$res = $test->getAllProducts();

print_r($res);
