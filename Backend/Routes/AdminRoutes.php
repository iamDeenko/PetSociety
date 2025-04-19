<?php

require_once __DIR__ . '/../Services/AdminService.php';


Flight::route('GET /admin/smth', function () {
    echo "TEST";
});
