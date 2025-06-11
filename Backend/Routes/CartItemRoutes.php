<?php



/**
 * @OA\Post(
 *     path="/cart/item/new-item",
 *     tags={"cart"},
 *     summary="Add a new item to the cart",
 *     description="Add a product to a user's cart by providing cart_ID, product_ID, and quantity.",
 *     security={{"ApiKey": {}}},
 *     @OA\RequestBody(
 *         required=true,
 *         description="Cart item data",
 *         @OA\JsonContent(
 *             required={"cart_id", "product_id", "quantity"},
 *             @OA\Property(property="cart_id", type="integer", example=1),
 *             @OA\Property(property="product_id", type="integer", example=10),
 *             @OA\Property(property="quantity", type="integer", example=2)
 *         )
 *     ),
 *     @OA\Response(response=200, description="Cart item added successfully."),
 *     @OA\Response(response=400, description="Bad request. Missing or invalid data."),
 *     @OA\Response(response=401, description="Unauthorized. Missing or invalid token."),
 *     @OA\Response(response=500, description="Internal server error.")
 * )
 */
Flight::route('POST /cart/item/new-item', function () {
    $data = Flight::request()->data;

    if ($data['cart_id'] && $data['product_id'] && $data['quantity']) {
        $data = Flight::request()->data;
        $cart_ID = $data['cart_id'];
        $product_ID = $data['product_id'];
        $quantity = $data['quantity'];


        return Flight::json(Flight::cartItemsService()->addCartItem($cart_ID, $product_ID, $quantity));
    }

    $error = ["Message" => "No Data!", "Status" => 'Failed!'];

    return Flight::json($error);
});



/**
 * @OA\Delete(
 *     path="/cart/item/{cart_item_ID}/{user_ID}",
 *     tags={"cart"},
 *     summary="Delete an item from the cart",
 *     description="Delete a specific item from a user's cart by cart_item_ID and user_ID.",
 *     security={{"ApiKey": {}}},
 *     @OA\Parameter(name="cart_item_ID", in="path", required=true, description="ID of the cart item", @OA\Schema(type="integer", example=5)),
 *     @OA\Parameter(name="user_ID", in="path", required=true, description="ID of the user", @OA\Schema(type="integer", example=1)),
 *     @OA\Response(response=200, description="Cart item deleted successfully."),
 *     @OA\Response(response=404, description="Cart item or user not found."),
 *     @OA\Response(response=401, description="Unauthorized. Missing or invalid token."),
 *     @OA\Response(response=500, description="Internal server error.")
 * )
 */
Flight::route('DELETE /cart/item/@cart_item_ID/@user_ID', function ($cart_item_ID, $user_ID) {
    Flight::json(Flight::cartItemsService()->deleteCartItem($cart_item_ID, $user_ID));
});
