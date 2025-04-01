<?php

require_once './Dao/BaseDao.php';
require_once './Dao/ProductDao.php';
require_once './Dao/SubcategoryDao.php';
require_once './Dao/FoodDetailsDao.php';
require_once './Dao/CategoryDao.php';
require_once './Dao/ToyDetailsDao.php';

$productDao = new ProductDao();

$tpd = new ToyDetailsDao();





echo print_r($tpd->findBy(['brand'],['ZoomPlay']));