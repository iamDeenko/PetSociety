<?php

require __DIR__ . '/vendor/autoload.php';


require __DIR__ . '/Services/AuthService.php';
require __DIR__ . '/Services/ProductService.php';



ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

use Firebase\JWT\JWT;
use Firebase\JWT\Key;




Flight::register('authService', 'AuthService');
Flight::register('productService', 'ProductService');

Flight::set('flight.base_url', '/Backend');

require_once __DIR__ . '/Routes/ProductRoutes.php';
require_once __DIR__ . '/Routes/AdminRoutes.php';
require_once __DIR__ . '/Routes/AuthRoutes.php';

Flight::start();
