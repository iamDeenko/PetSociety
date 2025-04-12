<?php

const WORKING_3 = "Working!!3!";
require_once __DIR__ . '/../Services/ProductService.php';





Flight::route('GET /', function(){
    echo "Working test";
});


Flight::route('GET /shop/pets/dogs', function(){
   echo "Test!";
});


Flight::route('GET /shopwww', function(){
   echo "Working!";
});


Flight::route('GET /shop', function () {
    echo WORKING_3;
});