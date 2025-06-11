<?php




require __DIR__ . "/../../../vendor/autoload.php";



if ($_SERVER['SERVER_NAME'] == 'petsociety.local' || $_SERVER['SERVER_NAME'] == '127.0.0.1') {
    define('BASE_URL', 'http://petsociety.local/api');
}

$openapi = \OpenApi\Generator::scan([
    __DIR__ . "/doc_setup.php",
    __DIR__ . "/../../../routes"
]);


header('Content-Type: application/json');
echo $openapi->toJson();
