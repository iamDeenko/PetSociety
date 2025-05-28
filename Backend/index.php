<?php

require __DIR__ . '/vendor/autoload.php';

// SERVICES
require __DIR__ . '/Services/AdminService.php';
require __DIR__ . '/Services/AuthService.php';
require __DIR__ . '/Services/ProductService.php';
require __DIR__ . '/Services/UserService.php';
require __DIR__ . "/Services/CartItemsService.php";
//  SERVICES



//  MIDDLEWARE
require __DIR__ . "/middleware/AuthMiddleWare.php";
//  MIDDLEWARE



//  CONFIG
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
//  CONFIG



// JWT
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
// JWT



//ROUTE MIDDLEWARE START
Flight::route('/*', function () {
    if (
        strpos(Flight::request()->url, '/auth/login') === 0 ||
        strpos(Flight::request()->url, '/auth/register') === 0 ||
        strpos(Flight::request()->url, '/shop') === 0
    ) {
        return TRUE;
    }
    if (strpos(Flight::request()->url, '/admin') === 0) {

        try {
            $token = Flight::request()->getHeader('Authentication');

            if (Flight::authMiddleware()->verifyToken($token) && Flight::authMiddleware()->verifyIsAdmin()) {

                return TRUE;
            } else {
                echo "USER NOT ADMIN";
            }
        } catch (Exception $e) {
            Flight::halt(401, $e->getMessage());
        }
    } else {
        try {
            $token = Flight::request()->getHeader("Authentication");
            if (Flight::authMiddleware()->verifyToken($token)) {
                return TRUE;
            }
        } catch (\Exception $e) {
            Flight::halt(401, $e->getMessage());
        }
    }
});
//ROUTE MIDDLEWARE END



#############################SERVICES#######################################

Flight::register('adminService', 'AdminService');
Flight::register('authService', 'AuthService');
Flight::register('cartItemsService', 'CartItemsService');
Flight::register('cartService', 'CartService');
Flight::register('categoryService', 'CategoryService');
Flight::register('orderDetailsService', 'OrderDetailsService');
Flight::register('productService', 'ProductService');
Flight::register('userService', 'UserService');
############################################################################

##########################MIDDLEWARE########################################
Flight::register('authMiddleware', 'AuthMiddleWare');

Flight::set('flight.base_url', '/Backend');

require_once __DIR__ . '/Routes/AdminRoutes.php';
require_once __DIR__ . '/Routes/AuthRoutes.php';
require_once __DIR__ . '/Routes/CartRoutes.php';
require_once __DIR__ . '/routes/CartItemRoutes.php';
require_once __DIR__ . '/Routes/ProductRoutes.php';
require_once __DIR__ . '/Routes/UserRoutes.php';

Flight::start();
