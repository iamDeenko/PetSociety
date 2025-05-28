let CategoryService = {
  getAllSubcategories: function (categoryID) {
    RestClient.get(
      "/subcategory/" + categoryID,
      function (data) {
        const productSubcategoryDiv = document.getElementById(
          "product-subcategory-div"
        );

        if (productSubcategoryDiv) {
          productSubcategoryDiv.innerHTML = "";

          data.forEach(function (subcategory) {
            productSubcategoryDiv.innerHTML += `
            <div class="subcategory-item" data-value="${subcategory.name}" onclick="CategoryService.getProductsBySubcategoryName('${subcategory.name}')">
             
            <span>

            ${subcategory.name}
            </span>
            </div>
          `;
          });
        }
      },
      function (error) {
        console.error("Error fetching subcategories:", error);
      }
    );
  },

  getProductsBySubcategoryName: function (subcategory_name) {
    RestClient.get("/subcategory-items/" + subcategory_name, function (data) {
      const productItemsDiv = document.getElementById("product-items-div");

      const whichSubcategory = document.getElementById("subcategory");

      if (whichSubcategory) {
        whichSubcategory.innerHTML = "";
        whichSubcategory.style.display = "inline";
        whichSubcategory.innerHTML = ` &nbsp;&nbsp;> ${subcategory_name}`;
      }

      productItemsDiv.innerHTML = "";
      if (data.length === 0) {
        productItemsDiv.innerHTML = `
          <h3> Ooops, there seem to be no ${subcategory_name} right now. Try again later!</h3>
        `;
      }

      data.forEach(function (product) {
        console.log("PRODUCT DATA:", product);

        productItemsDiv.innerHTML += `
        
          <a href = "#view_product" style="text-decoration: none; color:black; outline: none;" onclick = "ProductService.getProductById(${product.product_id})">
          <div class="product-item" data-id=${product.product_id}>
          <div class="product-item-image">
          <img src="/assets/${product.image_url}" ... />
          </div>
          <div class="product-item-info text-start d-flex flex-column">
          <span>
          <h5>${product.name}</h5>
          <span>/ ${product.subcategory_name}</span>
          </span>
          <span>$${product.price}</span>
          </div>
          </div>
          
          </a>
        `;
      });
    });
  },

  loadSubcategoriesInMainView: function () {
    RestClient.get("/subcategories/all", function (data) {
      const allSubcats = document.getElementById("all");

      data.forEach((element) => {
        allSubcats.innerHTML += `<div class="class d-flex text-center m-1">
        <div class="subcategory-image">
        
          <img src="/assets/images/subcategories/${element.name}-image.png">
        </div>
        <div class="subcategory-name">
          ${element.name}
        </div>
        <div>`;
      });
    });
  },
};
