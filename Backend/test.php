<?php


# Base DAO
require_once './Dao/BaseDao.php';


# Categories DAOs
require_once './Dao/CategoryDao.php';
require_once './Dao/SubcategoryDao.php';


# Product DAO
require_once './Dao/ProductDao.php';


# Product Details DAOs
require_once './Dao/FoodDetailsDao.php';
require_once './Dao/ToyDetailsDao.php';
require_once './Dao/AccessoriesDetailsDao.php';
require_once './Dao/PetDetailsDao.php';


$productDao = new SubcategoryDao();

echo print_r($productDao->findBy(['category_id'],[3], ['name']));