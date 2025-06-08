let AdminService = {
  init: function () {
    AdminService.loadCustomerData();
    AdminService.getTotalSales();
  },

  getUsersByName: function (name) {
    if (!name) {
      const cardBody = document.getElementById("user-card-body");
      cardBody.innerHTML = "";
      cardBody.innerHTML =
        '<h5 class="text-center mt-5">Please enter a name to search for users.</h5>';
      return;
    }

    const cardBody = document.getElementById("user-card-body");

    cardBody.innerHTML = "";
    RestClient.get(`/admin/user/name/${name}`, function (data) {
      console.log(data);

      data.forEach((user) => {
        cardBody.innerHTML += ` 
        <div class="d-flex flex-column justify-content-between align-items-center  p-1">
            <div class="d-flex flex-row justify-content-between align-items-center w-100">
              <h5 class="mb-0">${user.first_name} ${user.last_name}</h5>
              <div onclick="AdminService.toggleOnOff(${user.user_id})" title="Show Details">
                <img src="/assets/images/icons/down-icon.png" id="down-icon${user.user_id}" style="width: 22px; height: 22px;" alt="Show Details">
              </div>
            </div>

            <div class="px-1 mt-3 in-active w-100" id="user-card-body-${user.user_id}">
              <div class="d-flex flex-row justify-content-around align-items-center w-100">
                <div class="mt-1 p-1 text-center">
                  <div onclick="AdminService.getUserOrderHistory(${user.user_id})" class="text-center">
                    <img class="align-self-center" src="/assets/images/icons/historyIcon.png" style="width: 28px; height: 28px;" alt="View Order History">
                    <p class="border-bottom">Order History</p>
                  </div>
                </div>

                <div class="mb-0 p-1 d-flex justify-content-center align-items-center flex-column" onclick="AdminService.getUserCart(${user.user_id})">
                  <img class="align-self-center" src="/assets/images/icons/cart.png" style="width: 28px; height: 28px; " alt="View Carts">
                  <p  class = "border-bottom text-end">Active Carts</p>
                </div>


                <div  class="mb-0 p-1 d-flex justify-content-center align-items-center flex-column" onclick="AdminService.showMoreUserInfo(${user.user_id})">
                  
                <img class="align-self-center" src="/assets/images/icons/infoIcon.png" style="width: 28px; height: 28px; " alt="View More Info">
                <p  class = "border-bottom">More Info</p>
                  </div>


              </div>
            </div>
          </div>
        
        
        `;
      });
    });
  },

  toggleOnOff: function (data) {
    console.log(data);

    const cardBody = document.getElementById(`user-card-body-${data}`);
    const downIcon = document.getElementById(`down-icon${data}`);

    if (cardBody.classList.contains("in-active")) {
      downIcon.src = "/assets/images/icons/up-icon.png";

      cardBody.classList.remove("in-active");
      cardBody.classList.add("is-active");
    } else {
      downIcon.src = "/assets/images/icons/down-icon.png";
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

  getTotalSales: function () {
    RestClient.get("/orders/total-sales", function (data) {
      console.log("Total Sales Data:", data);

      const salesChartContainer = document.getElementById("salesChart");

      if (!data || data.length === 0) {
        console.warn("No sales data available.");
        salesChartContainer.innerHTML = `
          <div class="text-center mt-5">
            <h5 class="text-danger">No Sales Data Available</h5>
            <p class="text-muted">You have not made any sales yet. Encourage customers to make purchases to see data here.</p>
          </div>
        `;
        return;
      }

      const ctx = salesChartContainer.getContext("2d");

      // Extract order_date and total_amount from the JSON data
      const orderDates = data.map((item) => item.order_date);
      const totalAmounts = data.map((item) => parseFloat(item.total_amount));

      console.log(totalAmounts);
      console.log(orderDates);

      // Format the order_date to a more readable format
      const formattedDates = orderDates.map((date) => {
        const options = { month: "short", day: "numeric" };
        return new Date(date).toLocaleDateString("en-US", options);
      });

      // Create the chart
      new Chart(ctx, {
        type: "line",
        data: {
          labels: formattedDates,
          datasets: [
            {
              label: "Daily Sales",
              data: totalAmounts,
              borderColor: "#4CAF50",
              backgroundColor: "rgba(76, 175, 80, 0.2)",
              pointBackgroundColor: "#4CAF50",
              pointBorderColor: "#4CAF50",
              pointHoverBackgroundColor: "#81C784",
              pointHoverBorderColor: "#388E3C",
              fill: true,
              tension: 0.4827,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
              labels: {
                font: {
                  size: 14,
                  family: "Arial, sans-serif",
                },
                color: "#333",
              },
            },
            tooltip: {
              backgroundColor: "#4CAF50",
              titleFont: {
                size: 14,
                weight: "bold",
              },
              bodyFont: {
                size: 12,
              },
              footerFont: {
                size: 10,
              },
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Date",
                font: {
                  size: 14,
                  weight: "bold",
                },
                color: "#333",
              },
              ticks: {
                font: {
                  size: 12,
                },
                color: "#666",
              },
            },
            y: {
              title: {
                display: true,
                font: {
                  size: 14,
                  weight: "bold",
                },
                color: "#333",
              },
              ticks: {
                font: {
                  size: 12,
                },
                color: "#666",
              },
              beginAtZero: true,
            },
          },
        },
      });
    });
  },

  showMoreUserInfo: function (user_id) {
    console.log("Fetching user info for ID:", user_id);

    RestClient.get(`/admin/user/id/${user_id}`, function (user) {
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
                        user.user_image_url || "/assets/images/default.png"
                      }" alt="User Image" class="img-fluid rounded-circle mb-3" style="object-fit:cover; max-width:150px; max-height=150px; height=150px; width=150px;" />
                    </dvv>
                    <div class="col-md-8">
                      <p><strong>ID:</strong> ${user.user_id || ""}</p>
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

  getUserCart: function (user_id) {
    console.log("CLICKED");

    RestClient.get(`/admin/user/cart/${user_id}`, function (cart) {
      console.log(cart);

      const existingModal = document.getElementById("userCartModal");
      if (existingModal) existingModal.innerHTML = "";

      let modalHTML = `

      <div class = "col-md-12">
          <div class="modal fade" id="userCartModalInner" tabindex="-1" aria-labelledby="userCartModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg text-center modal-dialog-centered">
              <div class="modal-content">
                <div class="text-center">
                  <h3 class="modal-title p-2 text-center" id="userCartModalLabel">User's Active Cart</h3>
                </div>

                <table class="mt-3 text-center gap-5">
                  <thead>
                      <tr>
                          <th>Cart ID</th>
                          <th>Cart Status</th>
                          <th>Created At</th>
                          <th>Updated At</th>
                          <th>Cart Total</th>
                      </tr>
                  </thead>

                  <tbody class="mb-5 pb-5 "> 
                      <tr>
                        <td>
                        ${cart.cart.cart_ID}
                        </td>

                        <td>
                        ${cart.cart.status}
                        </td>

                         <td>
                        ${cart.cart.created_at}
                        </td>

                         <td>
                        ${cart.cart.updated_at}
                        </td>

                          <td>
                          $${cart.cart.price_total}
                        </td>
                      </tr>
                  </tbody>
                </table>


                
         
                <div class="modal-footer">
                  <button type="button" class="button-line" data-bs-dismiss="modal">Close</button>
                </div>
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
      { id: 1, name: "Pets" },
      { id: 2, name: "Accessories" },
      { id: 3, name: "Food" },
      { id: 4, name: "Toys" },
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

  getProductByName: function (name) {
    RestClient.get(
      "/admin/products/" + title,
      function (result) {
        console.log(result);
      },
      function (error) {
        console.log(error);
      }
    );
  },

  getUserOrderHistory: function (user_id) {
    RestClient.get(`/admin/user/orders/${user_id}`, function (orders) {
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
  showSection: function (sectionId) {
    const sections = document.querySelectorAll(".admin-content");
    sections.forEach((section) => section.classList.add("d-none"));

    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
      selectedSection.classList.remove("d-none");

      // Load data based on section
      if (sectionId === "customers") {
        AdminService.loadCustomerData();
      } else if (sectionId === "sales") {
        // Initialize sales chart if not already done
        setTimeout(() => {
          AdminService.getTotalSales();
        }, 100);
      }
    }
  },
  loadCustomerData: function () {
    RestClient.get("/admin/users", function (data) {
      console.log(data);

      const tableBody = document.getElementById("customer-table-body");

      tableBody.innerHTML = "";
      data.forEach((customer) => {
        tableBody.innerHTML += `
        <tr>
          <td>${customer.user_id}</td>
          <td>${customer.first_name} ${customer.last_name}</td>
          <td>${customer.email}</td>
          <td>${customer.phone || "N/A"}</td>
          <td>${customer.country || "N/A"}</td>
          <td class="text-center">
            <button class="action-btn action-btn-edit" onclick="AdminService.viewCustomerOrderHistory(${
              customer.user_id
            })">
              Order History
            </button>
            <button class="action-btn action-btn-delete" onclick="AdminService.editCustomer(${
              customer.user_id
            }, '${customer.first_name}', '${customer.last_name}', '${
          customer.email
        }', '${customer.phone || ""}', '${customer.country || ""}', '${
          customer.city || ""
        }', '${customer.postal_code || ""}', '${
          customer.address_line1 || ""
        }')">
              Edit
            </button>
          </td>
        </tr>
        `;
      });
    });
  },

  viewCustomerOrderHistory: function (customerId) {
    RestClient.get(`/admin/user/orders/${customerId}`, function (orders) {
      const modalContainer = document.getElementById(
        "customerOrderHistoryModal"
      );

      const modalHTML = `
        <div class="modal fade" id="orderHistoryModal" tabindex="-1" aria-labelledby="orderHistoryModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-xl modal-dialog-centered">
            <div class="modal-content notion-modal">
              <div class="notion-modal-header">
                <div class="notion-modal-title">
                  Order History
                </div>
                <div class="notion-modal-subtitle">Customer ID: ${customerId}</div>
              </div>
              <div class="notion-modal-body">
                ${
                  orders && orders.length > 0
                    ? `
                  <table class="notion-order-table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Order Date</th>
                        <th>Status</th>
                        <th>Total Amount</th>
                        <th>Items</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${orders
                        .map(
                          (order) => `
                        <tr>
                          <td>#${order.order_id}</td>
                          <td>${new Date(order.order_date).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}</td>
                          <td>
                            <span class="notion-status-badge ${
                              order.status === "completed" ||
                              order.status === "Completed"
                                ? "notion-status-completed"
                                : order.status === "pending" ||
                                  order.status === "Pending"
                                ? "notion-status-pending"
                                : "notion-status-cancelled"
                            }">
                              ${order.status || "Completed"}
                            </span>
                          </td>
                          <td>$${parseFloat(order.total_amount || 0).toFixed(
                            2
                          )}</td>
                          <td>${order.item_count || "N/A"} items</td>
                          <td>
                            <button class="notion-btn notion-btn-secondary" onclick="AdminService.viewOrderDetails(${
                              order.order_ID
                            })">
                              View Details
                            </button>
                          </td>
                        </tr>
                      `
                        )
                        .join("")}
                    </tbody>
                  </table>
                `
                    : `
                  <div class="notion-empty-state">
                    <div class="notion-empty-state-icon">📦</div>
                    <div class="notion-empty-state-title">No Orders Found</div>
                    <div class="notion-empty-state-text">This customer hasn't placed any orders yet.</div>
                  </div>
                `
                }
              </div>
              <div class="notion-modal-footer">
                <button type="button" class="notion-btn notion-btn-secondary" data-bs-dismiss="modal">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      `;

      modalContainer.innerHTML = modalHTML;
      const modal = new bootstrap.Modal(
        document.getElementById("orderHistoryModal")
      );
      modal.show();
    });
  },

  editCustomer: function (
    userId,
    firstName,
    lastName,
    email,
    phone,
    country,
    city,
    postalCode,
    address
  ) {
    const modalContainer = document.getElementById("editCustomerModal");

    const modalHTML = `
      <div class="modal fade" id="editCustomerModalInner" tabindex="-1" aria-labelledby="editCustomerModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content notion-modal">
            <div class="notion-modal-header">
              <div class="notion-modal-title">
                <div class="notion-modal-icon notion-modal-icon-edit">✏️</div>
                Edit Customer
              </div>
              <div class="notion-modal-subtitle">Update customer information</div>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form id="editCustomerForm">
              <div class="notion-modal-body">
                <div class="notion-customer-grid">
                  <div class="notion-form-group">
                    <label class="notion-form-label" for="edit-first-name">First Name</label>
                    <input type="text" id="edit-first-name" class="notion-form-input" value="${firstName}" required>
                  </div>
                  <div class="notion-form-group">
                    <label class="notion-form-label" for="edit-last-name">Last Name</label>
                    <input type="text" id="edit-last-name" class="notion-form-input" value="${lastName}" required>
                  </div>
                  <div class="notion-form-group">
                    <label class="notion-form-label" for="edit-email">Email Address</label>
                    <input type="email" id="edit-email" class="notion-form-input" value="${email}" required>
                  </div>
                  <div class="notion-form-group">
                    <label class="notion-form-label" for="edit-phone">Phone Number</label>
                    <input type="tel" id="edit-phone" class="notion-form-input" value="${
                      phone || ""
                    }" placeholder="Enter phone number">
                  </div>
                  <div class="notion-form-group">
                    <label class="notion-form-label" for="edit-country">Country</label>
                    <input type="text" id="edit-country" class="notion-form-input" value="${
                      country || ""
                    }" placeholder="Enter country">
                  </div>
                  <div class="notion-form-group">
                    <label class="notion-form-label" for="edit-city">City</label>
                    <input type="text" id="edit-city" class="notion-form-input" value="${
                      city || ""
                    }" placeholder="Enter city">
                  </div>
                  <div class="notion-form-group">
                    <label class="notion-form-label" for="edit-postal-code">Postal Code</label>
                    <input type="text" id="edit-postal-code" class="notion-form-input" value="${
                      postalCode || ""
                    }" placeholder="Enter postal code">
                  </div>
                  <div class="notion-form-group">
                    <label class="notion-form-label" for="edit-address">Address</label>
                    <textarea id="edit-address" class="notion-form-input notion-form-textarea" placeholder="Enter full address">${
                      address || ""
                    }</textarea>
                  </div>
                </div>
                
                <div class="notion-customer-field" style="margin-top: 24px;">
                  <div class="notion-customer-field-label">Customer ID</div>
                  <div class="notion-customer-field-value">#${userId}</div>
                </div>
              </div>
              <div class="notion-modal-footer">
                <button type="button" class="notion-btn notion-btn-secondary" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="submit" class="notion-btn notion-btn-primary">
                  💾 Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;

    modalContainer.innerHTML = modalHTML;

    // Add form submission handler
    document
      .getElementById("editCustomerForm")
      .addEventListener("submit", function (e) {
        e.preventDefault();

        const updatedCustomer = {
          user_id: userId,
          first_name: document.getElementById("edit-first-name").value,
          last_name: document.getElementById("edit-last-name").value,
          email: document.getElementById("edit-email").value,
          phone: document.getElementById("edit-phone").value,
          country: document.getElementById("edit-country").value,
          city: document.getElementById("edit-city").value,
          postal_code: document.getElementById("edit-postal-code").value,
          address_line1: document.getElementById("edit-address").value,
        };

        // Call your API to update customer
        RestClient.put(
          `/admin/user/${userId}`,
          updatedCustomer,
          function (response) {
            console.log("Customer updated successfully:", response);

            // Show success message and close modal
            const modal = bootstrap.Modal.getInstance(
              document.getElementById("editCustomerModalInner")
            );
            modal.hide();

            // Reload customer data
            AdminService.loadCustomerData();

            // You can add a toast notification here
            if (typeof toastr !== "undefined") {
              toastr.success("Customer updated successfully!");
            }
          },
          function (error) {
            console.error("Error updating customer:", error);
            if (typeof toastr !== "undefined") {
              toastr.error("Failed to update customer. Please try again.");
            }
          }
        );
      });

    const modal = new bootstrap.Modal(
      document.getElementById("editCustomerModalInner")
    );
    modal.show();
  },

  viewOrderDetails: function (orderId) {
    // This function can be implemented later to show detailed order information
    console.log(`Viewing details for order ID: ${orderId}`);
    if (typeof toastr !== "undefined") {
      toastr.info(`Order details for #${orderId} - Feature coming soon!`);
    }
  },
};

AdminService.init();
