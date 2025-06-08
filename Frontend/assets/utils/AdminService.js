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
    RestClient.get(
      "/orders/total-sales",
      function (data) {
        console.log("Total Sales Data:", data);

        const salesChartContainer = document.getElementById("salesChart");
        const chartParent = salesChartContainer.parentElement;

        if (!data || data.length === 0) {
          console.warn("No sales data available.");

          // Replace the entire chart container with a no-data message
          chartParent.innerHTML = `
          <div class="text-center mt-5 p-5">
            <div style="font-size: 3rem; margin-bottom: 1rem;">📊</div>
            <h5 class="text-muted mb-3">No Sales Data Available</h5>
            <p class="text-muted">You have not made any sales yet. Encourage customers to make purchases to see analytics here.</p>
          </div>
        `;
          return;
        }

        // Ensure we have a fresh canvas element
        if (!salesChartContainer || salesChartContainer.tagName !== "CANVAS") {
          chartParent.innerHTML =
            '<canvas id="salesChart" width="400" height="200"></canvas>';
        }

        const canvas = document.getElementById("salesChart");

        // Check if Chart.js is available
        if (typeof Chart === "undefined") {
          console.error("Chart.js library not loaded");
          chartParent.innerHTML = `
          <div class="text-center mt-5 p-5">
            <h5 class="text-danger">Chart library not available</h5>
            <p class="text-muted">Please refresh the page to load the chart library.</p>
          </div>
        `;
          return;
        }

        const ctx = canvas.getContext("2d");

        // Extract order_date and total_amount from the JSON data
        const orderDates = data.map((item) => item.order_date);
        const totalAmounts = data.map((item) => parseFloat(item.total_amount));

        console.log("Total Amounts:", totalAmounts);
        console.log("Order Dates:", orderDates);

        // Format the order_date to a more readable format
        const formattedDates = orderDates.map((date) => {
          const options = { month: "short", day: "numeric" };
          return new Date(date).toLocaleDateString("en-US", options);
        });

        // Destroy existing chart if it exists
        if (
          window.salesChart &&
          typeof window.salesChart.destroy === "function"
        ) {
          window.salesChart.destroy();
        } // Create the chart and store reference globally
        window.salesChart = new Chart(ctx, {
          type: "line",
          data: {
            labels: formattedDates,
            datasets: [
              {
                label: "Daily Sales ($)",
                data: totalAmounts,
                borderColor: "#4CAF50",
                backgroundColor: "rgba(76, 175, 80, 0.2)",
                pointBackgroundColor: "#4CAF50",
                pointBorderColor: "#4CAF50",
                pointHoverBackgroundColor: "#81C784",
                pointHoverBorderColor: "#388E3C",
                fill: true,
                tension: 0.4,
                borderWidth: 3,
                pointRadius: 5,
                pointHoverRadius: 7,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "top",
                labels: {
                  font: {
                    size: 14,
                    family: "Arial, sans-serif",
                    weight: "600",
                  },
                  color: "#333",
                  padding: 20,
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
                cornerRadius: 8,
                displayColors: false,
                callbacks: {
                  label: function (context) {
                    return "Sales: $" + context.parsed.y.toFixed(2);
                  },
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
                grid: {
                  color: "rgba(0, 0, 0, 0.1)",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Sales Amount ($)",
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
                  callback: function (value) {
                    return "$" + value.toFixed(0);
                  },
                },
                grid: {
                  color: "rgba(0, 0, 0, 0.1)",
                },
                beginAtZero: true,
              },
            },
          },
        });

        // Calculate and display sales summary
        AdminService.updateSalesSummary(data);
      },
      function (error) {
        console.error("Error fetching sales data:", error);
        const salesChartContainer = document.getElementById("salesChart");
        const chartParent = salesChartContainer.parentElement;

        chartParent.innerHTML = `
        <div class="text-center mt-5 p-5">
          <div style="font-size: 3rem; margin-bottom: 1rem;">⚠️</div>
          <h5 class="text-danger mb-3">Error Loading Sales Data</h5>
          <p class="text-muted">Unable to fetch sales analytics. Please try again later.</p>
          <button class="btn btn-primary mt-3" onclick="AdminService.getTotalSales()">Retry</button>
        </div>
      `;
      }
    );
  },

  updateSalesSummary: function (salesData) {
    if (!salesData || salesData.length === 0) {
      document.getElementById("sales-summary").style.display = "none";
      return;
    }

    // Calculate total sales
    const totalSales = salesData.reduce(
      (sum, item) => sum + parseFloat(item.total_amount),
      0
    );

    // Calculate average order value
    const averageOrder = totalSales / salesData.length;

    // Total number of orders
    const totalOrders = salesData.length;

    // Update the summary cards
    document.getElementById(
      "total-sales-amount"
    ).textContent = `$${totalSales.toFixed(2)}`;
    document.getElementById(
      "average-order-amount"
    ).textContent = `$${averageOrder.toFixed(2)}`;
    document.getElementById("total-orders-count").textContent = totalOrders;

    // Show the summary section
    document.getElementById("sales-summary").style.display = "flex";
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
          <div class="modal-dialog modal-xl modal-dialog-centered">
            <div class="modal-content notion-modal">
              <div class="notion-modal-header">
                <div class="notion-modal-title">
        
                  Add New Product
                </div>
                <div class="notion-modal-subtitle">Create a new product in your inventory</div>
              </div>
              <form id="addProductForm" enctype="multipart/form-data">
                <div class="notion-modal-body">
                  <div class="row">
                    <!-- Image Upload Section -->
                    <div class="col-md-4">
                      <div class="notion-form-group">
                        <label class="notion-form-label">Product Image</label>
                        <div class="notion-image-upload-container" style="border: 2px dashed #e5e7eb; border-radius: 12px; padding: 24px; text-align: center; background: rgba(249, 250, 251, 0.5);">
                          <img id="add-product-image-preview" src="/assets/images/default.png" alt="Product Preview" 
                               style="max-height: 200px; max-width: 100%; border-radius: 8px; margin-bottom: 16px; object-fit: cover;" />
                          <div style="margin-bottom: 12px; color: #6b7280; font-size: 14px;">
                            📷 Upload Product Image
                          </div>
                          <input type="file" class="notion-form-input" id="add-product-image" name="image" accept="image/*" required />
                        </div>
                      </div>
                    </div>
                    
                    <!-- Product Details Section -->
                    <div class="col-md-8">
                      <div class="notion-customer-grid" style="grid-template-columns: 1fr 1fr;">
                        <div class="notion-form-group">
                          <label for="add-product-name" class="notion-form-label">Product Name</label>
                          <input type="text" class="notion-form-input" id="add-product-name" name="name" placeholder="Enter product name" required>
                        </div>
                        <div class="notion-form-group">
                          <label for="add-product-brand" class="notion-form-label">Brand</label>
                          <input type="text" class="notion-form-input" id="add-product-brand" name="brand" placeholder="Enter brand name" required>
                        </div>
                        <div class="notion-form-group">
                          <label for="add-product-price" class="notion-form-label">Price ($)</label>
                          <input type="number" class="notion-form-input" id="add-product-price" name="price" min="0" step="0.01" placeholder="0.00" required>
                        </div>
                        <div class="notion-form-group">
                          <label for="add-product-category" class="notion-form-label">Category</label>
                          <select class="notion-form-input" id="add-product-category" name="category_id" required>
                            <option value="" disabled selected>Select a category</option>
                            ${categoryOptions}
                          </select>
                        </div>
                      </div>
                      
                      <div class="notion-form-group">
                        <label for="add-product-description" class="notion-form-label">Description</label>
                        <textarea class="notion-form-input notion-form-textarea" id="add-product-description" name="description" rows="4" placeholder="Enter detailed product description..." required></textarea>
                      </div>
                      
                      <!-- Category-specific fields will be added here dynamically -->
                      <div id="category-specific-fields"></div>
                    </div>
                  </div>
                </div>
                <div class="notion-modal-footer">
                  <button type="button" class="notion-btn notion-btn-secondary" data-bs-dismiss="modal">Cancel</button>
                  <button type="submit" class="notion-btn notion-btn-primary">
                    ✅ Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      `;

    document.body.insertAdjacentHTML("beforeend", modalHTML);

    // Image preview functionality
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

    // Category change handler for dynamic fields
    document
      .getElementById("add-product-category")
      .addEventListener("change", function (e) {
        const categoryId = e.target.value;
        const categoryName = e.target.options[e.target.selectedIndex].text;
        AdminService.addCategorySpecificFields(categoryId, categoryName);
      });

    // Form submission handler
    document
      .getElementById("addProductForm")
      .addEventListener("submit", function (e) {
        e.preventDefault();
        const formData = new FormData(this);
        const userToken = localStorage.getItem("user_token");

        // Show loading state
        const submitBtn = document.querySelector(
          "#addProductForm .notion-btn-primary"
        );
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = "⏳ Adding Product...";
        submitBtn.disabled = true;

        $.ajax({
          url: "http://petsociety.local/api/admin/product/addproduct",
          type: "POST",
          headers: {
            Authentication: userToken,
          },
          data: formData,
          processData: false,
          contentType: false,
          success: function (response) {
            if (typeof toastr !== "undefined") {
              toastr.success("Product added successfully!");
            }
            const modal = bootstrap.Modal.getInstance(
              document.getElementById("addProductModal")
            );
            modal.hide();
            document.getElementById("addProductModal").remove();

            // Refresh products if we're on the products section
            // AdminService.loadProductData(); // Uncomment when product loading function exists
          },
          error: function (xhr) {
            if (typeof toastr !== "undefined") {
              toastr.error("Failed to add product. Please try again.");
            }
            // Reset button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
          },
        });
      });

    // Show modal
    const modal = new bootstrap.Modal(
      document.getElementById("addProductModal")
    );
    modal.show();
  },

  // Helper function to add category-specific fields
  addCategorySpecificFields: function (categoryId, categoryName) {
    const container = document.getElementById("category-specific-fields");

    // Clear existing fields
    container.innerHTML = "";

    // Add fields based on category
    if (categoryName === "Pets") {
      container.innerHTML = `
        <div class="notion-customer-grid" style="grid-template-columns: 1fr 1fr; margin-top: 20px;">
          <div class="notion-form-group">
            <label for="pet-breed" class="notion-form-label">Breed</label>
            <input type="text" class="notion-form-input" id="pet-breed" name="breed" placeholder="Enter breed">
          </div>
          <div class="notion-form-group">
            <label for="pet-age" class="notion-form-label">Age</label>
            <input type="text" class="notion-form-input" id="pet-age" name="age" placeholder="e.g., 2 years">
          </div>
          <div class="notion-form-group">
            <label for="pet-gender" class="notion-form-label">Gender</label>
            <select class="notion-form-input" id="pet-gender" name="gender">
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div class="notion-form-group">
            <label for="pet-color" class="notion-form-label">Color</label>
            <input type="text" class="notion-form-input" id="pet-color" name="color" placeholder="Enter color">
          </div>
        </div>
      `;
    } else if (categoryName === "Accessories" || categoryName === "Toys") {
      container.innerHTML = `
        <div class="notion-customer-grid" style="grid-template-columns: 1fr 1fr; margin-top: 20px;">
          <div class="notion-form-group">
            <label for="material" class="notion-form-label">Material</label>
            <input type="text" class="notion-form-input" id="material" name="material" placeholder="Enter material">
          </div>
          <div class="notion-form-group">
            <label for="size" class="notion-form-label">Size</label>
            <select class="notion-form-input" id="size" name="size">
              <option value="">Select size</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
              <option value="Extra Large">Extra Large</option>
            </select>
          </div>
          <div class="notion-form-group">
            <label for="pet-type" class="notion-form-label">Pet Type</label>
            <select class="notion-form-input" id="pet-type" name="pet_type">
              <option value="">Select pet type</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Bird">Bird</option>
              <option value="Fish">Fish</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div class="notion-form-group">
            <label for="color" class="notion-form-label">Color</label>
            <input type="text" class="notion-form-input" id="color" name="color" placeholder="Enter color">
          </div>
        </div>
      `;
    } else if (categoryName === "Food") {
      container.innerHTML = `
        <div class="notion-customer-grid" style="grid-template-columns: 1fr 1fr; margin-top: 20px;">
          <div class="notion-form-group">
            <label for="weight" class="notion-form-label">Weight</label>
            <input type="text" class="notion-form-input" id="weight" name="weight" placeholder="e.g., 5kg">
          </div>
          <div class="notion-form-group">
            <label for="flavor" class="notion-form-label">Flavor</label>
            <input type="text" class="notion-form-input" id="flavor" name="flavor" placeholder="Enter flavor">
          </div>
          <div class="notion-form-group">
            <label for="age-recommendation" class="notion-form-label">Age Recommendation</label>
            <select class="notion-form-input" id="age-recommendation" name="age_recommendation">
              <option value="">Select age group</option>
              <option value="Puppy/Kitten">Puppy/Kitten</option>
              <option value="Adult">Adult</option>
              <option value="Senior">Senior</option>
              <option value="All Ages">All Ages</option>
            </select>
          </div>
          <div class="notion-form-group">
            <label for="ingredients" class="notion-form-label">Main Ingredients</label>
            <input type="text" class="notion-form-input" id="ingredients" name="ingredients" placeholder="Enter main ingredients">
          </div>
        </div>
      `;
    }
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
          
          </td>
        </tr>
        `;
      });
    });
  },

  viewCustomerOrderHistory: function (customerId) {
    RestClient.get(`/admin/user/orders/${customerId}`, function (orders) {
      console.log(orders);

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

  // Product Management Functions
  editProductModal: function () {
    console.log("Opening edit product modal");

    const existingModal = document.getElementById("editProductModal");
    if (existingModal) existingModal.innerHTML = "";

    const modalHTML = `
      <div class="modal fade" id="editProductModalInner" tabindex="-1" aria-labelledby="editProductModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content notion-modal">
            <div class="notion-modal-header">
              <div class="notion-modal-title">
                <div class="notion-modal-icon notion-modal-icon-edit">🔍</div>
                Search & Edit Product
              </div>
              <div class="notion-modal-subtitle">Search for a product to edit</div>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="notion-modal-body">
              <div class="notion-form-group">
                <label class="notion-form-label">Search Products</label>
                <input type="text" class="notion-form-input" id="edit-product-search" placeholder="Enter product name or description..." />
              </div>
              <div id="edit-product-results" class="mt-3"></div>
            </div>
            <div class="notion-modal-footer">
              <button type="button" class="notion-btn notion-btn-secondary" data-bs-dismiss="modal">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById("editProductModal").innerHTML = modalHTML;

    // Add search functionality
    document
      .getElementById("edit-product-search")
      .addEventListener("input", function (e) {
        const query = e.target.value.trim();
        if (query.length >= 2) {
          AdminService.searchProducts(query, "edit");
        } else {
          document.getElementById("edit-product-results").innerHTML = "";
        }
      });

    const modal = new bootstrap.Modal(
      document.getElementById("editProductModalInner")
    );
    modal.show();
  },

  removeProductModal: function () {
    console.log("Opening remove product modal");

    const existingModal = document.getElementById("removeProductModal");
    if (existingModal) existingModal.innerHTML = "";

    const modalHTML = `
      <div class="modal fade" id="removeProductModalInner" tabindex="-1" aria-labelledby="removeProductModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content notion-modal">
            <div class="notion-modal-header">
              <div class="notion-modal-title">
                <div class="notion-modal-icon notion-modal-icon-delete">🗑️</div>
                Search & Remove Product
              </div>
              <div class="notion-modal-subtitle">Search for a product to remove</div>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="notion-modal-body">
              <div class="notion-form-group">
                <label class="notion-form-label">Search Products</label>
                <input type="text" class="notion-form-input" id="remove-product-search" placeholder="Enter product name or description..." />
              </div>
              <div id="remove-product-results" class="mt-3"></div>
            </div>
            <div class="notion-modal-footer">
              <button type="button" class="notion-btn notion-btn-secondary" data-bs-dismiss="modal">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById("removeProductModal").innerHTML = modalHTML;

    // Add search functionality
    document
      .getElementById("remove-product-search")
      .addEventListener("input", function (e) {
        const query = e.target.value.trim();
        if (query.length >= 2) {
          AdminService.searchProducts(query, "remove");
        } else {
          document.getElementById("remove-product-results").innerHTML = "";
        }
      });

    const modal = new bootstrap.Modal(
      document.getElementById("removeProductModalInner")
    );
    modal.show();
  },

  searchProducts: function (query, action) {
    const userToken = localStorage.getItem("user_token");

    $.ajax({
      url: `http://petsociety.local/api/admin/products/search/${encodeURIComponent(
        query
      )}`,
      type: "GET",
      headers: {
        Authentication: userToken,
      },
      success: function (products) {
        const resultsContainer = document.getElementById(
          `${action}-product-results`
        );

        if (products && products.length > 0) {
          let resultsHTML = '<div class="product-search-results">';

          products.forEach((product) => {
            resultsHTML += `
              <div class="product-search-item" style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin-bottom: 12px; display: flex; align-items: center; gap: 16px;">
                <img src="/assets/${product.image_url}" alt="${
              product.name
            }" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;" />
                <div style="flex: 1;">
                  <h6 style="margin: 0; font-weight: 600;">${product.name}</h6>
                  <p style="margin: 4px 0; color: #6b7280; font-size: 14px;">${
                    product.category_name
                  } > ${product.subcategory_name}</p>
                  <p style="margin: 0; font-weight: 600; color: #059669;">$${parseFloat(
                    product.price
                  ).toFixed(2)}</p>
                </div>
                <button class="notion-btn ${
                  action === "edit" ? "notion-btn-primary" : "notion-btn-danger"
                }" 
                        onclick="AdminService.${action}Product(${
              product.product_id
            })">
                  ${action === "edit" ? "✏️ Edit" : "🗑️ Remove"}
                </button>
              </div>
            `;
          });

          resultsHTML += "</div>";
          resultsContainer.innerHTML = resultsHTML;
        } else {
          resultsContainer.innerHTML = `
            <div class="notion-empty-state">
              <div class="notion-empty-state-icon">🔍</div>
              <div class="notion-empty-state-title">No Products Found</div>
              <div class="notion-empty-state-text">Try adjusting your search terms.</div>
            </div>
          `;
        }
      },
      error: function (xhr) {
        console.error("Error searching products:", xhr);
        if (typeof toastr !== "undefined") {
          toastr.error("Failed to search products. Please try again.");
        }
      },
    });
  },

  editProduct: function (productId) {
    const userToken = localStorage.getItem("user_token");

    // First, get the product details
    $.ajax({
      url: `http://petsociety.local/api/admin/product/${productId}`,
      type: "GET",
      headers: {
        Authentication: userToken,
      },
      success: function (product) {
        AdminService.showEditProductForm(product);
      },
      error: function (xhr) {
        console.error("Error fetching product:", xhr);
        if (typeof toastr !== "undefined") {
          toastr.error("Failed to load product details.");
        }
      },
    });
  },

  showEditProductForm: function (product) {
    const modalHTML = `
      <div class="modal fade" id="editProductFormModal" tabindex="-1" aria-labelledby="editProductFormModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-dialog-centered">
          <div class="modal-content notion-modal">
            <div class="notion-modal-header">
              <div class="notion-modal-title">
                <div class="notion-modal-icon notion-modal-icon-edit">✏️</div>
                Edit Product
              </div>
              <div class="notion-modal-subtitle">Update product information</div>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form id="editProductForm" enctype="multipart/form-data">
              <div class="notion-modal-body">
                <div class="row">
                  <!-- Image Upload Section -->
                  <div class="col-md-4">
                    <div class="notion-form-group">
                      <label class="notion-form-label">Product Image</label>
                      <div class="notion-image-upload-container" style="border: 2px dashed #e5e7eb; border-radius: 12px; padding: 24px; text-align: center; background: rgba(249, 250, 251, 0.5);">
                        <img id="edit-product-image-preview" src="/assets/${
                          product.image_url
                        }" alt="Product Preview" 
                             style="max-height: 200px; max-width: 100%; border-radius: 8px; margin-bottom: 16px; object-fit: cover;" />
                        <div style="margin-bottom: 12px; color: #6b7280; font-size: 14px;">
                          📷 Change Product Image
                        </div>
                        <input type="file" class="notion-form-input" id="edit-product-image" name="image" accept="image/*" />
                      </div>
                    </div>
                  </div>
                  
                  <!-- Product Details Section -->
                  <div class="col-md-8">
                    <div class="notion-customer-grid" style="grid-template-columns: 1fr 1fr;">
                      <div class="notion-form-group">
                        <label for="edit-product-name" class="notion-form-label">Product Name</label>
                        <input type="text" class="notion-form-input" id="edit-product-name" name="name" value="${
                          product.name
                        }" required>
                      </div>
                      <div class="notion-form-group">
                        <label for="edit-product-price" class="notion-form-label">Price ($)</label>
                        <input type="number" class="notion-form-input" id="edit-product-price" name="price" value="${
                          product.price
                        }" min="0" step="0.01" required>
                      </div>
                      <div class="notion-form-group">
                        <label for="edit-product-stock" class="notion-form-label">Stock Quantity</label>
                        <input type="number" class="notion-form-input" id="edit-product-stock" name="stock_quantity" value="${
                          product.stock_quantity || 0
                        }" min="0" required>
                      </div>
                      <div class="notion-form-group">
                        <label class="notion-form-label">Category</label>
                        <input type="text" class="notion-form-input" value="${
                          product.category_name
                        } > ${
      product.subcategory_name
    }" readonly style="background: #f9fafb;">
                      </div>
                    </div>
                    
                    <div class="notion-form-group">
                      <label for="edit-product-description" class="notion-form-label">Description</label>
                      <textarea class="notion-form-input notion-form-textarea" id="edit-product-description" name="description" rows="4" required>${
                        product.description
                      }</textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div class="notion-modal-footer">
                <button type="button" class="notion-btn notion-btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" class="notion-btn notion-btn-primary">
                  ✅ Update Product
                </button>
              </div>
              <input type="hidden" name="product_id" value="${
                product.product_id
              }">
            </form>
          </div>
        </div>
      </div>
    `;

    // Close the search modal and show the edit form
    const searchModal = bootstrap.Modal.getInstance(
      document.getElementById("editProductModalInner")
    );
    if (searchModal) searchModal.hide();

    document.body.insertAdjacentHTML("beforeend", modalHTML);

    // Image preview functionality
    document
      .getElementById("edit-product-image")
      .addEventListener("change", function (e) {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function (evt) {
            document.getElementById("edit-product-image-preview").src =
              evt.target.result;
          };
          reader.readAsDataURL(file);
        }
      });

    // Form submission handler
    document
      .getElementById("editProductForm")
      .addEventListener("submit", function (e) {
        e.preventDefault();
        const formData = new FormData(this);
        const userToken = localStorage.getItem("user_token");
        const productId = formData.get("product_id");

        // Show loading state
        const submitBtn = document.querySelector(
          "#editProductForm .notion-btn-primary"
        );
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = "⏳ Updating Product...";
        submitBtn.disabled = true;

        $.ajax({
          url: `http://petsociety.local/api/admin/product/${productId}`,
          type: "PUT",
          headers: {
            Authentication: userToken,
          },
          data: formData,
          processData: false,
          contentType: false,
          success: function (response) {
            if (typeof toastr !== "undefined") {
              toastr.success("Product updated successfully!");
            }
            const modal = bootstrap.Modal.getInstance(
              document.getElementById("editProductFormModal")
            );
            modal.hide();
            document.getElementById("editProductFormModal").remove();
          },
          error: function (xhr) {
            if (typeof toastr !== "undefined") {
              toastr.error("Failed to update product. Please try again.");
            }
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
          },
        });
      });

    const modal = new bootstrap.Modal(
      document.getElementById("editProductFormModal")
    );
    modal.show();
  },

  removeProduct: function (productId) {
    // Show confirmation dialog
    if (
      confirm(
        "Are you sure you want to delete this product? This action cannot be undone."
      )
    ) {
      const userToken = localStorage.getItem("user_token");

      $.ajax({
        url: `http://petsociety.local/api/admin/product/${productId}`,
        type: "DELETE",
        headers: {
          Authentication: userToken,
        },
        success: function (response) {
          if (typeof toastr !== "undefined") {
            toastr.success("Product deleted successfully!");
          }

          // Close the modal and refresh the search results
          const modal = bootstrap.Modal.getInstance(
            document.getElementById("removeProductModalInner")
          );
          if (modal) modal.hide();

          // Clear search results
          document.getElementById("remove-product-results").innerHTML = "";
          document.getElementById("remove-product-search").value = "";
        },
        error: function (xhr) {
          console.error("Error deleting product:", xhr);
          if (typeof toastr !== "undefined") {
            toastr.error("Failed to delete product. Please try again.");
          }
        },
      });
    }
  },
};

AdminService.init();
