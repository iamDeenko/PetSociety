<?php

require __DIR__ . '/../vendor/autoload.php';



// --- CORRECTION START ---
// Use __DIR__ which resolves to C:\wamp64\PetSociety\Backend
// Then append the path relative TO that directory
require __DIR__ . '/Services/AuthService.php'; 
require __DIR__ . '/Services/ProductService.php';
// --- CORRECTION END ---


use Firebase\JWT\JWT;
use Firebase\JWT\Key;




Flight::route('/*', function() {
    if(
        strpos(Flight::request()->url, '/auth/login') === 0 ||
        strpos(Flight::request()->url, '/auth/register') === 0
    ) {
        return TRUE;
    } else {
        try {
            $token = Flight::request()->getHeader("Authentication");
            if(!$token)
                Flight::halt(401, "Missing authentication header");
 
 
            $decoded_token = JWT::decode($token, new Key(Config::JWT_SECRET(), 'HS256'));
 
 
            Flight::set('user', $decoded_token->user);
            Flight::set('jwt_token', $token);
            return TRUE;
        } catch (\Exception $e) {
            Flight::halt(401, $e->getMessage());
        }
    }
 });
 


Flight::register('authService', 'AuthService');
Flight::register('productService', 'ProductService'); // Use a DIFFERENT key for ProductService

require_once __DIR__ . '/Routes/ProductRoutes.php';
require_once __DIR__ . '/Routes/AdminRoutes.php';
require_once __DIR__ . '/Routes/AuthRoutes.php';

Flight::start();
