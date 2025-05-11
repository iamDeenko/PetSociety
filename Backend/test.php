<?php

require_once '../PetSociety/Backend/Services/AdminService.php';

$adminService = new AdminService();

print_r($adminService->getAllUsers())


?>