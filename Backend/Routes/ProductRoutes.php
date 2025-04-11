<?php


Flight::route('GET /', function(){
    echo "Working test";
});


Flight::route('GET /shop/pets/dogs', function(){
   echo "Test!";
});


Flight::route('GET /shopwww', function(){
   echo "Working!";
});


