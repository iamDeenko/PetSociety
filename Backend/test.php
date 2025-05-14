<?php

require_once 'Backend/Dao/AuthDao.php';
require_once 'Backend/Services/ProductService.php';
require_once 'Backend/Services/AuthService.php';
require_once 'Backend/Dao/Factory.php';




$test = Factory::make('product');


$res = $test->getAllProducts();

print_r($res);
