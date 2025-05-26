let CartService = {
  initializeCart: function () {
    const userToken = localStorage.getItem("user_token");
    const decodedToken = jwt_decode(userToken);
    const userID = decodedToken.user.user_id;

    console.log(":):)):):):):):)");

    console.log(userID);

    const user_ID = {
      user_id: userID,
    };

    RestClient.post(
      `/user/create-cart/${userID}`,
      user_ID,
      function (response) {
        console.log(response);

        console.log("Cart Initalized.");
      },
      function (error) {
        console.error("Response: " + error);

        console.log("Cart Initialized ( DO NOT WORRY ABOUT THE ERROR )");
      }
    );
  },

  getCartID: function () {
    return new Promise((resolve, reject) => {
      const userToken = localStorage.getItem("user_token");
      if (!userToken) {
        console.error("CartService::getCartID() => User token not found.");
        reject("User token not found");
        return;
      }
      const decodedToken = jwt_decode(userToken);
      const userID = decodedToken.user.user_id;
      console.log("getCartID - USER ID:" + userID);

      RestClient.get(
        `/cart/${userID}`,
        function (data) {
          // Accept both cart_id and cart_ID
          const cartId = data.cart_id || data.cart_ID;
          if (cartId) {
            console.log("HOLDUP", cartId);
            console.log("CartService::getCartId() -> " + cartId);
            resolve(cartId);
          } else {
            console.error(
              "getCartID: cart_id not found in response or data is malformed.",
              data
            );
            reject("Cart ID not found in API response");
          }
        },
        function (error) {
          console.log(error);
          reject(error);
        }
      );
    });
  },

  addToCart: async function (product_id) {
    console.log("CartService::addToCart");

    const cart_ID = await CartService.getCartID();

    console.log("CID:::");

    console.log(cart_ID);

    const data = {
      cart_id: cart_ID,
      product_id: product_id,
      quantity: 1,
    };

    console.log("endofthis");

    console.log(data);
    RestClient.post(
      "/cart/item/new-item",
      data,
      function (response) {
        toastr.success("Successfully added item to cart.");
        console.log(response);
        console.log("Success!!!");
      },
      function (error) {
        toastr.error("Error adding item to cart.");
        console.log(error);
      }
    );
  },

  adoptPet: async function (product_id) {
    console.log("CartService::adoptPet");

    const cart_ID = await CartService.getCartID();

    console.log("CID:::");

    console.log(cart_ID);

    const data = {
      cart_id: cart_ID,
      product_id: product_id,
      quantity: 1,
    };

    console.log("endofthis");

    console.log(data);
    RestClient.post(
      "/cart/item/new-item",
      data,
      function (response) {
        toastr.success("Successfully added item to cart.");
        console.log(response);
        console.log("Success!!!");
      },
      function (error) {
        toastr.error("Error adding item to cart.");
        console.log(error);
      }
    );
  },

  __init: function () {
    const userToken = localStorage.getItem("user_token");
    const decodedToken = jwt_decode(userToken);
    const userID = decodedToken.user.user_id;

    console.log(userID);
    console.log("denko medenko init");

    RestClient.get(`/user/cart/${userID}`, function (data) {
      const cartDiv = document.getElementById("cart-div");

      console.log(cartDiv);
      console.log("denko ::: ", data);

      if (data.cart === false || !data.cart) {
        cartDiv.innerHTML = `
            <div class="text-center mt-5">
            <h1>Your Cart is Empty</h1>
            <p>Browse our store and add some items to your cart!</p>
          </div>
          `;
        return;
      }

      console.log(data);

      const NumbersInCart = CartService.countItems(data.orders);

      cartDiv.innerHTML = `
           <div class="container mt-5">
          <div class="col mb-4 justify-content-between align-items-center">
            <div class="col-md-4">
              <h1>Home > Cart</h1>
            </div>
            <div class="col-md-4 mt-5">
              <h4><strong> Total: </strong> $${data.cart.price_total}</h4>
            </div>
            <div class="col-md-4 mt-1">
              <h4><strong> Items: </strong> ${NumbersInCart}</h4>
            </div>
            <div class= "col-md-4 mt-1">
              <button class= "card p-2 mt-5 mb-5 shadow-lg" style=" background-color:#0072bb; color:white; outline:none; border:none; "  id="purchaseNowButton" onclick = "OrderService.purchaseItems()">Purchase Now</button>
            </div>
          </div>
          <div id="cart-items" class="row text-center justify-content-center g-3">
          </div>
        </div>
      
        `;

      const itemsDiv = document.getElementById("cart-items");
      let itemsHTML = "";

      for (const order of data.orders) {
        itemsHTML += `
            <div class="col-md-6">
            <div class="card p-2 shadow-lg" style="border:none !important">
              <div class="row align-items-center">
                <div class="col-md-5 text-center">
                  <img src="assets/${order.image_url}" class="img-fluid rounded" style="max-height: 250px; object-fit: contain;">
                </div>
                <div class="col-md-7">
                  <div class="card-body text-start">
                    <h3 class="card-title text-start mb-5 ">"${order.product_name}"</h3>

                    <div class = "text-start">
                    <p class="card-text mb-1"><strong>Quantity:</strong> ${order.quantity}</p>
                    <p class="card-text mb-1"><strong>Price:</strong> $${order.price}</p>
                    </div>


                    <button class= "card p-2 mt-5 shadow-lg" style=" background-color:#c0231f; color:white; outline:none; border:none; " class="shadow" onclick="CartService.deleteOrder(${order.cart_item_ID})">Remove from Cart</button>
                    </div>
                </div>
              </div>
            </div>
          </div>
          `;
      }

      itemsDiv.innerHTML = itemsHTML;
    });
  },

  countItems: function (iterable) {
    if (iterable == null) return 0;

    if (typeof iterable.length === "number") {
      return iterable.length;
    }

    if (typeof iterable.size === "number") {
      return iterable.size;
    }

    if (typeof iterable[Symbol.iterator] === "function") {
      let count = 0;
      for (const _ of iterable) {
        count++;
      }
      return count;
    }

    return 0;
  },

  deleteOrder: function (data) {
    console.log("deleting item with id:", data);
    const userToken = localStorage.getItem("user_token");
    const userID = UserService.getUserId();

    $.ajax({
      url: `http://petsociety.local/api/cart/item/${data}/${userID}`,
      type: "DELETE",
      headers: {
        Authentication: `${userToken}`,
      },
      success: function (data) {
        console.log(data);
        toastr.success("Deleted product from cart.");
      },
      error: function (error) {
        console.log(error);
        toastr.success("Deleted product from cart.");
      },
    });
  },
};
