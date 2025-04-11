<?php

require_once __DIR__ . '/../Services/ProductService.php';


Flight::route('GET /', function () {
    echo "👋 Hello from Flight!";
});
