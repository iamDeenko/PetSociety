<?php

require_once "Dao/Factory.php";

require_once "Dao/AdminDao.php";


$object = new AdminDao();



$res = $object->getAllUsers();

print_r($res);

?>