<?php


require_once '../PetSociety/Backend/Dao/ProductDao.php';
require_once '../PetSociety/Backend/Dao/AuthDao.php';
require_once '../PetSociety/Backend/Dao/BaseDao.php';
require_once '../PetSociety/Backend/Dao/CartDao.php';
require_once '../PetSociety/Backend/Dao/OrderDao.php';
require_once '../PetSociety/Backend/Dao/OrderItemDao.php';
require_once '../PetSociety/Backend/Dao/CategoryDao.php';

require_once '../PetSociety/Backend/Dao/UserDao.php';



$test = new ProductDao();


$res = $test->getProductsInSubcategory("Interactive");


print_r($res);
