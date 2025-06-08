<?php
require_once __DIR__ . '/../Services/OrderService.php';



Flight::route("GET /orders/total-sales", function () {

    $service = new OrderService();

    Flight::json($service->getTotalSales());
});
