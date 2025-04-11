<?php
require __DIR__ . '/../vendor/autoload.php';


Flight::register('');

require_once __DIR__ . '/../Backend/Routes/ProductRoutes.php';

Flight::start();
