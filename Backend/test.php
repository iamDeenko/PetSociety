<?php

require_once 'Backend/Dao/AuthDao.php';
require_once 'Backend/Services/ProductService.php';
require_once 'Backend/Services/AuthService.php';



$data = [
    "email" => "deenko@petsociety.test",
    "password" => "test123"
];

$authService = new AuthService();


$response = $authService->register($data);

print_r($response);



?>