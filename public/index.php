<?php
require __DIR__ . '/../vendor/autoload.php';

Flight::set('flight.base_url', '/PetSociety/public');

require_once __DIR__ . '/../Backend/Routes/ProductRoutes.php';

Flight::start();
