<?php


Flight::group("/admin", function () {


    /**
     * @OA\Get(
     *     path="/admin/user/id/{user_ID}",
     *     tags={"admin"},
     *     summary="Get user by ID (admin)",
     *     description="Returns user details for the given user ID.",
     *     security={{"ApiKey": {}}},
     *     @OA\Parameter(name="user_ID", in="path", required=true, description="ID of the user", @OA\Schema(type="integer", example=1)),
     *     @OA\Response(response=200, description="User details returned successfully."),
     *     @OA\Response(response=404, description="User not found."),
     *     @OA\Response(response=401, description="Unauthorized. Missing or invalid token."),
     *     @OA\Response(response=500, description="Internal server error.")
     * )
     */
    Flight::route("GET /user/id/@user_ID", function ($user_ID) {
        Flight::json(Flight::adminService()->getUserByID($user_ID));
    });

    /**
     * @OA\Get(
     *     path="/admin/user/name/{user_name}",
     *     tags={"admin"},
     *     summary="Get users by name (admin)",
     *     description="Returns a list of users matching the given name.",
     *     security={{"ApiKey": {}}},
     *     @OA\Parameter(name="user_name", in="path", required=true, description="Name of the user to search for", @OA\Schema(type="string", example="John Doe")),
     *     @OA\Response(response=200, description="Users returned successfully."),
     *     @OA\Response(response=404, description="No users found."),
     *     @OA\Response(response=401, description="Unauthorized. Missing or invalid token."),
     *     @OA\Response(response=500, description="Internal server error.")
     * )
     */
    Flight::route("GET /user/name/@user_name", function ($name) {




        Flight::json(Flight::adminService()->getUsersByName($name));
    });




    /**
     * @OA\Get(
     *     path="/admin/product/{product_name}",
     *     tags={"admin"},
     *     summary="Get products by name (admin)",
     *     description="Returns a list of products matching the given title.",
     *     security={{"ApiKey": {}}},
     *     @OA\Parameter(name="product_title", in="path", required=true, description="Title of the product to search for", @OA\Schema(type="string", example="Harry Potter")),
     *     @OA\Response(response=200, description="products returned successfully."),
     *     @OA\Response(response=404, description="No products found."),
     *     @OA\Response(response=401, description="Unauthorized. Missing or invalid token."),
     *     @OA\Response(response=500, description="Internal server error.")
     * )
     */
    Flight::route("GET /product/@product_title", function ($product_title) {
        Flight::json(Flight::productService()->getByTitle($product_title));
    });

    /**
     * @OA\Get(
     *     path="/admin/users",
     *     tags={"admin"},
     *     summary="Get all users (admin)",
     *     description="Returns a list of all users in the system.",
     *     security={{"ApiKey": {}}},
     *     @OA\Response(response=200, description="All users returned successfully."),
     *     @OA\Response(response=401, description="Unauthorized. Missing or invalid token."),
     *     @OA\Response(response=500, description="Internal server error.")
     * )
     */
    Flight::route("GET /users", function () {
        Flight::json(Flight::adminService()->getAllUsers());
    });

    /**
     * @OA\Get(
     *     path="/admin/user/orders/{user_ID}",
     *     tags={"admin"},
     *     summary="Get order history for a user (admin)",
     *     description="Returns the order history for the specified user.",
     *     security={{"ApiKey": {}}},
     *     @OA\Parameter(name="user_ID", in="path", required=true, description="ID of the user", @OA\Schema(type="integer", example=1)),
     *     @OA\Response(response=200, description="Order history returned successfully."),
     *     @OA\Response(response=404, description="User or orders not found."),
     *     @OA\Response(response=401, description="Unauthorized. Missing or invalid token."),
     *     @OA\Response(response=500, description="Internal server error.")
     * )
     */
    Flight::route("GET /user/orders/@user_ID", function ($user_ID) {
        Flight::json(Flight::adminService()->getUserOrderHistory($user_ID));
    });

    /**
     * @OA\Get(
     *     path="/admin/user/cart/{user_ID}",
     *     tags={"admin"},
     *     summary="Get cart for a user (admin)",
     *     description="Returns the cart for the specified user.",
     *     security={{"ApiKey": {}}},
     *     @OA\Parameter(name="user_ID", in="path", required=true, description="ID of the user", @OA\Schema(type="integer", example=1)),
     *     @OA\Response(response=200, description="Cart returned successfully."),
     *     @OA\Response(response=404, description="User or cart not found."),
     *     @OA\Response(response=401, description="Unauthorized. Missing or invalid token."),
     *     @OA\Response(response=500, description="Internal server error.")
     * )
     */    Flight::route("GET /user/cart/@user_ID", function ($user_ID) {


        $cart = Flight::userService()->getUserCart($user_ID);
        $orders = Flight::userService()->getUserOrders($user_ID);

        Flight::json([
            'cart' => $cart,
            'orders' => $orders,
        ]);
    });
    /**
     * @OA\Post(
     *     path="/admin/product/addproduct",
     *     tags={"admin"},
     *     summary="Add a new product (admin)",
     *     description="Creates a new product in the system.",
     *     security={{"ApiKey": {}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 @OA\Property(property="name", type="string", description="Product name"),
     *                 @OA\Property(property="description", type="string", description="Product description"),
     *                 @OA\Property(property="price", type="number", description="Product price"),
     *                 @OA\Property(property="stock_quantity", type="integer", description="Stock quantity"),
     *                 @OA\Property(property="category", type="string", description="Product category"),
     *                 @OA\Property(property="subcategory_id", type="integer", description="Subcategory ID"),
     *                 @OA\Property(property="type", type="string", description="Product type"),
     *                 @OA\Property(property="image", type="string", format="binary", description="Product image")
     *             )
     *         )
     *     ),
     *     @OA\Response(response=201, description="Product created successfully."),
     *     @OA\Response(response=400, description="Invalid product data."),
     *     @OA\Response(response=401, description="Unauthorized. Missing or invalid token."),
     *     @OA\Response(response=500, description="Internal server error.")
     * )
     */
    Flight::route("POST /product/addproduct", function () {
        $data = Flight::request()->data;
        $files = Flight::request()->files;

        try {
            $result = Flight::adminService()->addProduct($data, $files);
            Flight::json($result, 201);
        } catch (Exception $e) {
            Flight::json(['error' => $e->getMessage()], 400);
        }
    });

    /**
     * @OA\Get(
     *     path="/admin/products/search/{query}",
     *     tags={"admin"},
     *     summary="Search products by name or description",
     *     description="Returns products matching the search query.",
     *     security={{"ApiKey": {}}},
     *     @OA\Parameter(name="query", in="path", required=true, description="Search query", @OA\Schema(type="string")),
     *     @OA\Response(response=200, description="Products found successfully."),
     *     @OA\Response(response=404, description="No products found."),
     *     @OA\Response(response=401, description="Unauthorized. Missing or invalid token."),
     *     @OA\Response(response=500, description="Internal server error.")
     * )
     */
    Flight::route("GET /products/search/@query", function ($query) {
        Flight::json(Flight::adminService()->searchProducts($query));
    });

    /**
     * @OA\Get(
     *     path="/admin/product/{id}",
     *     tags={"admin"},
     *     summary="Get product by ID",
     *     description="Returns product details for the given product ID.",
     *     security={{"ApiKey": {}}},
     *     @OA\Parameter(name="id", in="path", required=true, description="Product ID", @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Product details returned successfully."),
     *     @OA\Response(response=404, description="Product not found."),
     *     @OA\Response(response=401, description="Unauthorized. Missing or invalid token."),
     *     @OA\Response(response=500, description="Internal server error.")
     * )
     */
    Flight::route("GET /product/@id", function ($id) {
        Flight::json(Flight::adminService()->getProductById($id));
    });

    /**
     * @OA\Put(
     *     path="/admin/product/{id}",
     *     tags={"admin"},
     *     summary="Update a product",
     *     description="Updates an existing product in the system.",
     *     security={{"ApiKey": {}}},
     *     @OA\Parameter(name="id", in="path", required=true, description="Product ID", @OA\Schema(type="integer")),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 @OA\Property(property="name", type="string", description="Product name"),
     *                 @OA\Property(property="description", type="string", description="Product description"),
     *                 @OA\Property(property="price", type="number", description="Product price"),
     *                 @OA\Property(property="stock_quantity", type="integer", description="Stock quantity"),
     *                 @OA\Property(property="image", type="string", format="binary", description="Product image")
     *             )
     *         )
     *     ),
     *     @OA\Response(response=200, description="Product updated successfully."),
     *     @OA\Response(response=400, description="Invalid product data."),
     *     @OA\Response(response=404, description="Product not found."),
     *     @OA\Response(response=401, description="Unauthorized. Missing or invalid token."),
     *     @OA\Response(response=500, description="Internal server error.")
     * )
     */
    Flight::route("PUT /product/@id", function ($id) {
        $data = Flight::request()->data;
        $files = Flight::request()->files;

        try {
            $result = Flight::adminService()->updateProduct($id, $data, $files);
            Flight::json($result);
        } catch (Exception $e) {
            Flight::json(['error' => $e->getMessage()], 400);
        }
    });

    /**
     * @OA\Delete(
     *     path="/admin/product/{id}",
     *     tags={"admin"},
     *     summary="Delete a product",
     *     description="Deletes a product from the system.",
     *     security={{"ApiKey": {}}},
     *     @OA\Parameter(name="id", in="path", required=true, description="Product ID", @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Product deleted successfully."),
     *     @OA\Response(response=404, description="Product not found."),
     *     @OA\Response(response=401, description="Unauthorized. Missing or invalid token."),
     *     @OA\Response(response=500, description="Internal server error.")
     * )
     */
    Flight::route("DELETE /product/@id", function ($id) {
        try {
            $result = Flight::adminService()->deleteProduct($id);
            Flight::json($result);
        } catch (Exception $e) {
            Flight::json(['error' => $e->getMessage()], 400);
        }
    });
});
