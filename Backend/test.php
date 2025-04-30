<?php

require_once "Dao/Factory.php";


$object = Factory::make('product');

$res = $object->getAll();

print_r($res);

?>