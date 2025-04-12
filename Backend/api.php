<?php

require __DIR__ . '/../vendor/autoload.php';

Flight::set('flight.base_url', '/Backend');

require_once __DIR__ . '/Routes/ProductRoutes.php';

Flight::start();
