<?php

require_once './Dao/Factory.php';


$productDao = Factory::make('proDuct');

print_r($productDao->findByCategory('FooD'));