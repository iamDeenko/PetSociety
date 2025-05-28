let ProductService = {
  __init: function () {
    const productItemsDiv = document.getElementById("product-items-div");

    RestClient.get(
      "/shop/pets",
      function (data) {
        console.log(data);

        console.log("VIBE CODE ", data[0].category_id);

        const subcategories = CategoryService.getAllSubcategories(
          data[0].category_id
        );

        console.log(subcategories);

        productItemsDiv.innerHTML = "";
        for (pet of data) {
          console.log(pet);

          productItemsDiv.innerHTML += `
           <a href = "#view_product" style="text-decoration: none; color:black; outline: none;" onclick = "ProductService.getProductById(${pet.product_id})">
          <div class="product-item" data-id=${pet.product_id}>
           <div class="product-item-image">
             <img src="/assets/${pet.image_url}" ... />
           </div>
           <div class="product-item-info text-start d-flex flex-column">
             <span>
               <h5>${pet.product_name}</h5>
               <span>/ ${pet.subcategory_name}</span>
             </span>
             <span>$${pet.price}</span>
           </div>
         </div>
           </a>
         
         `;
        }
      },
      function (error) {
        console.log(error);
      }
    );
  },

  getByCategory: function (category) {
    const whichCategory = document.getElementById("whichcategory");
    const productItemsDiv = document.getElementById("product-items-div");
    const whichSubcategory = document.getElementById("subcategory");
    whichSubcategory.innerHTML = "";
    RestClient.get(
      "/shop/" + category,
      function (data) {
        whichCategory.innerHTML = "";
        whichCategory.innerHTML = `<h1> ${category} </h1>`;

        console.log("VIBE CODE ", data[0].category_id);

        const subcategories = CategoryService.getAllSubcategories(
          data[0].category_id
        );

        productItemsDiv.innerHTML = "";
        for (pet of data) {
          productItemsDiv.innerHTML += `

          <a href = "#view_product" style="text-decoration: none; color:black; outline: none;" onclick = "ProductService.getProductById(${pet.product_id})">
          <div class="product-item" data-id=${pet.product_id}>
          <div class="product-item-image">
          <img src="/assets/${pet.image_url}" ... />
          </div>
          <div class="product-item-info text-start d-flex flex-column">
          <span>
          <h5>${pet.product_name}</h5>
          <span>/ ${pet.subcategory_name}</span>
          </span>
          <span>$${pet.price}</span>
          </div>
          </div>
          
          </a>
         `;
        }
      },
      function (error) {
        console.log(error);
      }
    );

    RestClient.get(
      "/shop/" + "pets",
      function (data) {
        console.log(data);
      },
      function (error) {
        console.log(error);
      }
    );
  },

  getProductById: function (product_id) {
    RestClient.get(
      "/shop/product/" + product_id,
      function (data) {
        ProductService.parseProductByCategory(
          data,
          function (updated_data, error) {
            if (error) {
              console.log(error);
              return;
            }
            console.log("UPDATED DATA: ");
            console.log(updated_data);
            const productView = document.getElementById("product-view");
            let view = "";
            switch ((data.category_name || "").toLowerCase()) {
              case "pets":
                view = ProductService.drawPetInfo(
                  data.category_name,
                  data.subcategory_name,
                  updated_data
                );
                break;
              case "accessories":
                view = ProductService.drawAccessoryInfo(
                  data.category_name,
                  data.subcategory_name,
                  updated_data
                );
                break;
              case "food":
                view = ProductService.drawFoodInfo(
                  data.category_name,
                  data.subcategory_name,
                  updated_data
                );
                break;
              case "toys":
                view = ProductService.drawToyInfo(
                  data.category_name,
                  data.subcategory_name,
                  updated_data
                );
                break;
              default:
                view =
                  '<div class="alert alert-warning">Unknown product category.</div>';
            }
            productView.innerHTML = view;
          }
        );
      },
      function (error) {
        console.log(error);
      }
    );
  },

  parseProductByCategory: function (data, callback) {
    console.log("called");
    RestClient.get(
      "/shop/" + data.category_name + "/" + data.product_id,
      function (result) {
        console.log("The parseproductcategory method returned: ");
        console.log(result);
        callback(result);
      },
      function (error) {
        callback(undefined);
      }
    );
  },

  drawPetInfo: function (categoryname, subcategoryname, data) {
    console.log("CALLED drawPetInfo");
    console.log(data);

    return `
        
        <div class="row mb-5">
    <p>Shop /</p>
    <h1>${categoryname} > ${subcategoryname}</h1>
  </div>
  <div class="product-view row mt-5">
    <div class="col-md-7 d-flex mt-5">
         <img class="shadow-lg" src="/assets/${data.image_url}" alt="" srcset="" />
    </div>
    <div class="col-md-4 p-lg-5 d-flex flex-column text-start">
      <h1>${data.name}</h1>
      <span>The ${data.breed}</span>
      <p class="mt-3 mb-5"> ${data.description} </p>
      <h4
        style="
          border-bottom: 1px solid !important;
          width: 100%;
          display: flex;
          margin-top: 1rem;
          padding-bottom: 1rem;
        "
      >
        $${data.price}
      </h4>
      <div class="row row-cols-3 text-center d-flex justify-content-between align-items-center">
        <div class="product-info col mt-5">
          <p class="product-info-header">Age</p>
          <p>${data.age}</p>
        </div>
        <div class="product-info mt-5">
          <p class="product-info-header">Gender</p>
          <p>${data.gender}</p>
        </div>
        <div class="product-info mt-5">
          <p class="product-info-header">Vaccine</p>
          <p>${data.vaccination_status}</p>
        </div>
        <div class="product-info mt-5">
          <p class="product-info-header">Color</p>
          <p>${data.color}</p>
        </div>
        <div class="product-info mt-5">
          <p class="product-info-header">Health</p>
          <p>${data.health_status}</p>
        </div>
        <div class="product-info mt-5">
          <p class="product-info-header">Special Needs</p>
          <p>${data.special_needs}</p>
        </div>
        
      </div>
      <button onclick="CartService.adoptPet(${data.product_id})">Adopt</button>
    </div>
  </div>
        
        
        `;
  },

  drawAccessoryInfo: function (categoryname, subcategoryname, data) {
    console.log("CALLED drawAccessoryInfo");
    console.log(data);
    return `
      <div class="row">
        <p>Shop /</p>
        <h1>${categoryname} > ${subcategoryname}</h1>
      </div>
      <div class="product-view row mt-5">
        <div class="col-md-7 p-lg-1 mt-5">
         <img class="shadow-lg" src="/assets/${data.image_url}" alt="" srcset="" />
        </div>
        <div class="col-md-4 p-lg-5 d-flex flex-column text-start">
          <h1>${data.name}</h1>
          <span>Brand: ${data.brand}</span>
          <p class="mt-3 mb-5">${data.description}</p>
          <h6 style="border-bottom: 1px solid !important;width: 100%;display: flex;margin-top: 1rem;padding-bottom: 1rem;">
            ${data.price}
          </h6>
          <div class="row row-cols-2 text-center d-flex justify-content-between align-items-center">
            <div class="product-info col mt-5"><p class="product-info-header">Material</p><p>${data.material}</p></div>
            <div class="product-info mt-5"><p class="product-info-header">Color</p><p>${data.color}</p></div>
            <div class="product-info mt-5"><p class="product-info-header">Size</p><p>${data.size}</p></div>
            <div class="product-info mt-5"><p class="product-info-header">Pet Type</p><p>${data.pet_type}</p></div>
          </div>
              <button onclick="CartService.addToCart(${data.product_id})">Add to Cart</button>
        </div>
      </div>
    `;
  },

  drawFoodInfo: function (categoryname, subcategoryname, data) {
    console.log("CALLED drawFoodInfo");
    console.log(data);
    return `
    <div class="row">
      <p>Shop /</p>
      <h1>${categoryname} > ${subcategoryname}</h1>
    </div>
    <div class="product-view row mt-5">
      <div class="col-md-7 p-lg-1 mt-5">
         <img class="shadow-lg" src="/assets/${
           data.image_url
         }" alt="" srcset="" />
      </div>
      <div class="col-md-4 p-lg-5 d-flex flex-column text-start">
        <h1>${data.name}</h1>
        <span>Brand: ${data.brand}</span>
        <p class="mt-3 mb-5">${data.description}</p>
        <h6 class="text-center" style="border-bottom: 1px solid !important;width: 100%;display:  flex;margin-top: 1rem;padding-bottom: 1rem;">
          ${data.price}
        </h6>
        <div class="row row-cols-2 text-center d-flex justify-content-between align-items-center">
          <div class="product-info col mt-5"><p class="product-info-header">Weight</p><p>${
            data.weight
          }</p></div>
          <div class="product-info mt-5"><p class="product-info-header">Ingredients</p><p>${
            data.ingredients
          }</p></div>
          <div class="product-info mt-5"><p class="product-info-header">Nutritional Info</p><p>${
            data.nutritional_info
          }</p></div>
          <div class="product-info mt-5"><p class="product-info-header">Age Group</p><p>${
            data.age_group
          }</p></div>
          <div class="product-info mt-5"><p class="product-info-header">Pet Type</p><p>${
            data.pet_type
          }</p></div>
          <div class="product-info mt-5"><p class="product-info-header">Dietary Type</p><p>${
            data.dietary_type
          }</p></div>
          <div class="product-info mt-5"><p class="product-info-header">Expiration Date</p><p>${
            data.expiration_date || ""
          }</p></div>
          <div class="product-info mt-5"><p class="product-info-header">Storage</p><p>${
            data.storage_instructions
          }</p></div>
        </div>
    <button class="w-50" onclick="CartService.addToCart(${
      data.product_id
    })">Add to Cart</button>
      </div>
    </div>
  `;
  },

  drawToyInfo: function (categoryname, subcategoryname, data) {
    console.log("CALLED drawToyInfo");
    console.log(data);
    return `
    <div class="row">
      <p>Shop /</p>
      <h1>${categoryname} > ${subcategoryname}</h1>
    </div>
    <div class="product-view row mt-5">
      <div class="col-md-7 p-lg-1 mt-5">
         <img class="shadow-lg" src="/assets/${data.image_url}" alt="" srcset="" />
      </div>
      <div class="col-md-4 p-lg-5 d-flex flex-column text-start">
        <h1>${data.name}</h1>
        <span>Brand: ${data.brand}</span>
        <p class="mt-3 mb-5">${data.description}</p>
        <h6 style="border-bottom: 1px solid !important;width: 100%;display: flex;margin-top: 1rem;padding-bottom: 1rem;">
          ${data.price}
        </h6>
        <div class="row row-cols-2 text-center d-flex justify-content-between align-items-center">
          <div class="product-info col mt-5"><p class="product-info-header">Material</p><p>${data.material}</p></div>
          <div class="product-info mt-5"><p class="product-info-header">Pet Type</p><p>${data.pet_type}</p></div>
          <div class="product-info mt-5"><p class="product-info-header">Age Recommendation</p><p>${data.age_recommendation}</p></div>
          <div class="product-info mt-5"><p class="product-info-header">Durability</p><p>${data.durability_rating}</p></div>
          <div class="product-info mt-5"><p class="product-info-header">Chew Resistance</p><p>${data.chew_resistance}</p></div>
        </div>
         <button onclick="CartService.addToCart(${data.product_id})">Add to Cart</button>
      </div>
    </div>
  `;
  },
};
