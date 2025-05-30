let AdminService = {
  init: function () {
    AdminService.renderAdminDiv();
  },

  getUsersByName: function (name) {
    console.log(name);

    if (!name) {
      const cardBody = document.getElementById("user-card-body");
      cardBody.innerHTML = "";
      cardBody.innerHTML =
        '<h4 class="text-center">Please enter a name to search for users.</h4>';
      return;
    }

    RestClient.get(`admin/user/name/${name}`, function (data) {
      const cardBody = document.getElementById("user-card-body");

      if (data.length === 0) {
        console.log("No users found.");
        cardBody.innerHTML = '<h4 class="text-center">No users found.</h4>';
        return;
      }

      cardBody.innerHTML = "";

      for (user of data) {
        cardBody.innerHTML += `
            <div class="d-flex flex-column justify-content-between align-items-center  p-1">
              <div class="d-flex flex-row justify-content-between align-items-center w-100">
                <h4 class="mb-0">${user.name}</h4>
                <div onclick="AdminService.toggleOnOff(${user.user_ID})" title="Show Details">
                  <img src="images/icons/down-icon.png" id="down-icon${user.user_ID}" style="width: 22px; height: 22px;" alt="Show Details">
                </div>
              </div>
  
              <div class="px-1 mt-3 in-active w-100" id="user-card-body-${user.user_ID}">
                <div class="d-flex flex-row justify-content-around align-items-center w-100">
                  <div class="mt-1 p-1 text-center">
                    <div onclick="AdminService.getUserOrderHistory(${user.user_ID})" class="text-center">
                      <img class="align-self-center" src="images/icons/historyIcon.png" style="width: 28px; height: 28px;" alt="View Order History">
                      <p class="border-bottom">Order History</p>
                    </div>
                  </div>
  
                  <div class="mb-0 p-1 d-flex justify-content-center align-items-center flex-column" onclick="AdminService.getUserCart(${user.user_ID})">
                    <img class="align-self-center" src="images/icons/cartIcon.png" style="width: 28px; height: 28px; " alt="View Carts">
                    <p  class = "border-bottom text-end">Active Carts</p>
                  </div>
  
  
                  <div  class="mb-0 p-1 d-flex justify-content-center align-items-center flex-column" onclick="AdminService.showMoreUserInfo(${user.user_ID})">
                    
                  <img class="align-self-center" src="images/icons/infoIcon.png" style="width: 28px; height: 28px; " alt="View More Info">
                  <p  class = "border-bottom">More Info</p>
                    </div>
  
  
                </div>
              </div>
            </div>
          `;
      }
    });
  },

  toggleOnOff: function (data) {
    console.log(data);

    const cardBody = document.getElementById(`user-card-body-${data}`);
    const downIcon = document.getElementById(`down-icon${data}`);

    if (cardBody.classList.contains("in-active")) {
      downIcon.src = "images/icons/up-icon.png";

      cardBody.classList.remove("in-active");
      cardBody.classList.add("is-active");
    } else {
      downIcon.src = "images/icons/down-icon.png";
      cardBody.classList.remove("is-active");
      cardBody.classList.add("in-active");
    }
  },

  toggleOnOffproduct: function (data) {
    console.log(data);

    const cardBody = document.getElementById(`product-card-body-${data}`);
    const downIcon = document.getElementById(`down-icon-product-${data}`);

    if (cardBody.classList.contains("in-active")) {
      downIcon.src = "images/icons/up-icon.png";

      cardBody.classList.remove("in-active");
      cardBody.classList.add("is-active");
    } else {
      downIcon.src = "images/icons/down-icon.png";
      cardBody.classList.remove("is-active");
      cardBody.classList.add("in-active");
    }
  },

  getUserByID: function (id) {
    RestClient.get(`admin/user/id/${id}`, function (data) {
      return data;
    });
  },

  showMoreUserInfo: function (user_ID) {
    console.log("Fetching user info for ID:", user_ID);

    RestClient.get(`admin/user/id/${user_ID}`, function (user) {
      const existingModal = document.getElementById("moreUserInfo");
      if (existingModal) existingModal.innerHTML = "";

      let modalHTML = `
          <div class="modal fade" id="moreUserInfoModal" tabindex="-1" aria-labelledby="moreUserInfoLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="moreUserInfoLabel">User Information</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <div class="row">
                    <dvv class="col-md-4 d-flex justify-content-center align-items-center text-center">
                      <img src="${
                        user.user_image_url || "images/default.png"
                      }" alt="User Image" class="img-fluid rounded-circle mb-3" style="max-width:150px;" />
                    </dvv>
                    <div class="col-md-8">
                      <p><strong>ID:</strong> ${user.user_ID || ""}</p>
                      <p><strong>Full Name:</strong> ${user.name || ""}</p>
                      <p><strong>Email:</strong> ${user.email || ""}</p>
                      <p><strong>Address:</strong> ${user.address || ""}</p>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
        `;
      document.getElementById("moreUserInfo").innerHTML = modalHTML;
      const modal = new bootstrap.Modal(
        document.getElementById("moreUserInfoModal")
      );
      modal.show();
    });
  },

  getUserCart: function (user_ID) {
    RestClient.get(`admin/user/cart/${user_ID}`, function (cart) {
      const existingModal = document.getElementById("userCartModal");
      if (existingModal) existingModal.innerHTML = "";

      let modalHTML = `
          <div class="modal fade" id="userCartModalInner" tabindex="-1" aria-labelledby="userCartModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="userCartModalLabel">User Active Cart</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <div class="table-responsive">
                    <table class="table table-striped">
                      <thead>
                        <tr>
                          <th>product</th>
                          <th>Quantity</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${
                          cart && cart.length > 0
                            ? cart
                                .map(
                                  (item) => `
                          <tr>
                            <td>${item.title || ""}</td>
                            <td>${item.quantity || ""}</td>
                            <td>$${item.price || ""}</td>
                          </tr>
                        `
                                )
                                .join("")
                            : '<tr><td colspan="3" class="text-center">No items in cart.</td></tr>'
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
        `;
      document.getElementById("userCartModal").innerHTML = modalHTML;
      const modal = new bootstrap.Modal(
        document.getElementById("userCartModalInner")
      );
      modal.show();
    });
  },

  addProductModal: function () {
    console.log("Adding product modal");

    // Remove any existing modal
    const existingModal = document.getElementById("addProductModal");
    if (existingModal) existingModal.remove();

    // Category options
    const categories = [
      { id: 2, name: "Science Fiction" },
      { id: 3, name: "Romance" },
      { id: 4, name: "Business" },
      { id: 6, name: "Adventure" },
      { id: 7, name: "Fictional" },
    ];

    const categoryOptions = categories
      .map((cat) => `<option value="${cat.id}">${cat.name}</option>`)
      .join("");

    const modalHTML = `
        <div class="modal fade" id="addProductModal" tabindex="-1" aria-labelledby="addProductModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
              <form id="addProductForm" enctype="multipart/form-data">
                <div class="modal-header">
                  <h5 class="modal-title" id="addProductModalLabel">Add New product</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <div class="row">
                    <div class="col-md-5 text-center">
                      <img id="add-product-image-preview" src="images/default.png" alt="product Cover Preview" class="img-fluid rounded mb-3" style="max-height:200px;" />
                      <input type="file" class="form-control mt-2" id="add-product-image" name="image" accept="image/*" required />
                    </div>
                    <div class="col-md-7">
                      <div class="mb-3">
                        <label for="add-product-title" class="form-label">Title</label>
                        <input type="text" class="form-control" id="add-product-title" name="title" required>
                      </div>
                      <div class="mb-3">
                        <label for="add-product-author" class="form-label">Author</label>
                        <input type="text" class="form-control" id="add-product-author" name="author" required>
                      </div>
                      <div class="mb-3">
                        <label for="add-product-price" class="form-label">Price</label>
                        <input type="number" class="form-control" id="add-product-price" name="price" min="0" step="0.01" required>
                      </div>
                      <div class="mb-3">
                        <label for="add-product-description" class="form-label">Description</label>
                        <textarea class="form-control" id="add-product-description" name="description" rows="4" required></textarea>
                      </div>
                      <div class="mb-3">
                        <label for="add-product-category" class="form-label">Category</label>
                        <select class="form-select" id="add-product-category" name="category_id" required>
                          <option value="" disabled selected>Select a category</option>
                          ${categoryOptions}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="submit" class="btn btn-primary">Add product</button>
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      `;

    document.body.insertAdjacentHTML("beforeend", modalHTML);

    // Image preview
    document
      .getElementById("add-product-image")
      .addEventListener("change", function (e) {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function (evt) {
            document.getElementById("add-product-image-preview").src =
              evt.target.result;
          };
          reader.readAsDataURL(file);
        }
      });

    document
      .getElementById("addProductForm")
      .addEventListener("submit", function (e) {
        e.preventDefault();
        const formData = new FormData(this);
        const userToken = localStorage.getItem("user_token");

        $.ajax({
          url: "http://web-project-ajna.local/api/admin/product/addproduct",
          type: "POST",
          headers: {
            Authentication: userToken,
          },
          data: formData,
          processData: false,
          contentType: false,
          success: function (response) {
            toastr.success("product added successfully!");
          },
          error: function (xhr) {
            toastr.error("Failed to add product.");
          },
        });

        const modal = bootstrap.Modal.getInstance(
          document.getElementById("addProductModal")
        );
        modal.hide();
        document.getElementById("addProductModal").remove();
      });

    // Show modal
    const modal = new bootstrap.Modal(
      document.getElementById("addProductModal")
    );
    modal.show();
  },

  getUserOrderHistory: function (user_ID) {
    RestClient.get(`admin/user/orders/${user_ID}`, function (orders) {
      const existingModal = document.getElementById("userOrderHistory");
      if (existingModal) existingModal.innerHTML = "";

      let modalHTML = `
          <div class="modal fade" id="userOrderHistoryModal" tabindex="-1" aria-labelledby="userOrderHistoryLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="userOrderHistoryLabel">User Order History</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <div class="table-responsive">
                    <table class="table table-striped">
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Date</th>
                          <th>Status</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${
                          orders && orders.length > 0
                            ? orders
                                .map(
                                  (order) => `
                          <tr>
                            <td>${order.order_ID}</td>
                            <td>${order.order_date || ""}</td>
                            <td>${order.status || "Completed"}</td>
                            <td>$${order.total_amount || ""}</td>
                          </tr>
                        `
                                )
                                .join("")
                            : '<tr><td colspan="4" class="text-center">No orders found.</td></tr>'
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
        `;
      document.getElementById("userOrderHistory").innerHTML = modalHTML;
      const modal = new bootstrap.Modal(
        document.getElementById("userOrderHistoryModal")
      );
      modal.show();
    });
  },

  renderAdminDiv: function () {
    const adminDiv = document.getElementById("admin-div");

    const userToken = localStorage.getItem("user_token");
    const decodedToken = jwt_decode(userToken);
    const data = decodedToken.user;

    adminDiv.innerHTML = `
      <div class="d-flex  justify-content-center align-items-center">
        <div class="d-flex flex-column justify-content-center align-items-center">
          <img src = ${data.user_image_url} class="img-fluid rounded-circle mb-3 mt-3" style="width: 100px; height: 100px;">
          <p> ${data.name}</p>
        </div>
  
        <div class = "flex-row"> 
  
        </div>
  
  
      </div>
    
      `;
  },

  getProductByTitle: function (name) {
    const cardBody = document.getElementById("product-card-body");
    if (!name) {
      cardBody.innerHTML = `
          <div class="d-flex flex-row justify-content-center align-items-center">
            <div class="d-flex p-2 flex-column justify-content-center align-items-center">
              <img src="images/icons/addIcon.png" class="img-fluid rounded-circle mb-3 mt-3">
              <p class="border-bottom">Add a Product</p>
            </div>
          </div>
        `;
      return;
    }

    RestClient.get(`admin/product/${name}`, function (data) {
      if (data.length === 0) {
        cardBody.innerHTML = `
            <div class="d-flex flex-row justify-content-center align-items-center">
              <div class="d-flex p-2 flex-column justify-content-center align-items-center" onclick="AdminService.addProductModal()">
                <img src="images/icons/addIcon.png" class="img-fluid rounded-circle mb-3 mt-3">
                <p class="border-bottom">Add a Product!</p>
              </div>
            </div>
          `;
        return;
      }

      cardBody.innerHTML = "";

      for (const product of data) {
        cardBody.innerHTML += `
            <div class="d-flex flex-column justify-content-between align-items-center p-1">
              <div class="d-flex flex-row justify-content-between align-items-center w-100">
                <h4 class="mb-0">${product.title}</h4>
                <div onclick="AdminService.toggleOnOffproduct(${product.product_ID})" title="Show Details">
                  <img src="images/icons/down-icon.png" id="down-icon-product-${product.product_ID}" style="width: 22px; height: 22px;" alt="Show Details">
                </div>
              </div>
              <div class="px-1 mt-3 in-active w-100" id="product-card-body-${product.product_ID}">
                <div class="d-flex flex-row justify-content-around align-items-center w-100">
                  <div class="mt-1 p-1 text-center">
                    <div onclick="AdminService.editProduct(${product.product_id})" class="text-center">
                      <img class="align-self-center" src="images/icons/editIcon.png" style="width: 28px; height: 28px;" onclick="ProductService.editProductById(${product.product_ID})" alt="Edit product">
                      <p class="border-bottom">Edit</p>
                    </div>
                  </div>
                  <div class="mb-0 p-1 d-flex justify-content-center align-items-center flex-column" onclick="ProductService.Peleteproduct(${product.product_ID})">
                    <img class="align-self-center" src="images/icons/removeIcon.png" style="width: 28px; height: 28px;" alt="Remove product">
                    <p class="border-bottom text-end">Removeee</p>
                  </div>
                  <div class="mb-0 p-1 d-flex justify-content-center align-items-center flex-column" onclick="productService.getOneByID(${product.product_ID})">
                    <img class="align-self-center" src="images/icons/infoIcon.png" style="width: 28px; height: 28px;" alt="Add product">
                    <p class="border-bottom" data-target="#exampleModalCenter" data-toggle="modal">More Info</p>
                  </div>
                </div>
              </div>
            </div>
          `;
      }
    });
  },
};

AdminService.init();
