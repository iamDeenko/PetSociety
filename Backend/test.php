<?php

require_once "Dao/Factory.php";

// Establish database connection using your Facto/usr/bin/php /srv/http/PetSociety/Backend/test.php
//PHP Fatal error:  Uncaught InvalidArgumentException: The table name must be a string. in /srv/http/PetSociety/Backend/Dao/BaseDao.php:70
//Stack trace:
//#0 /srv/http/PetSociety/Backend/Dao/BaseDao.php(15): BaseDao->convertName()
//#1 /srv/http/PetSociety/Backend/Dao/ProductDao.php(11): BaseDao->__construct()
//#2 /srv/http/PetSociety/Backend/test.php(9): ProductDao->__construct()
//#3 {main}
//  thrown in /srv/http/PetSociety/Backend/Dao/BaseDao.php on line 70
//
//Process finished with exit code 255ry class
$connection = Database::connect();

// Instantiate the ProductDao, passing the connection
$productDao = new ProductDao();

// Call the getAllPets method
$pets = $productDao->getAllPets();

// Print the results
print_r($pets);

?>