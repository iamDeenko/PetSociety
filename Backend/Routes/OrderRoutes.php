<?php
require_once __DIR__ . '/../Services/OrderService.php';



/**
 * @OA\Get(
 *     path="/orders/total-sales",
 *     tags={"orders"},
 *     summary="Get total sales data",
 *     description="Retrieve total sales data for analytics purposes.",
 *     security={{"ApiKey": {}}},
 *     @OA\Response(response=200, description="Total sales data retrieved successfully."),
 *     @OA\Response(response=401, description="Unauthorized. Missing or invalid token."),
 *     @OA\Response(response=500, description="Internal server error.")
 * )
 */
Flight::route("GET /orders/total-sales", function () {

    $service = new OrderService();

    Flight::json($service->getTotalSales());
});
