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

      allSubcats.innerHTML = "";

      data.forEach((element) => {
        allSubcats.innerHTML += `
  <div data-core-scroller-platter="" role="list" aria-label="Product" style="display:inline-flex;padding-bottom:40px;padding-top:16px;vertical-align:top;width: 100%;">
    <div data-core-scroller-item="" role="listitem" style="display:block;scroll-snap-align:start;">
        <div style="transform:matrix(1, 0, 0, 1, 140, 0);height:148px;margin-inline-end:10px;display:flex;margin-inline-start:0px;">
            <div data-trigger-click="click [data-relatedlink=':r8:_link']" style="vertical-align:top;cursor:pointer;">
                <div style="border-radius:18px;box-sizing:border-box;min-width:136px;overflow:hidden;padding:18px 8px 16px;">
                    <div style="padding-bottom:16px;"><img loading="lazy" width="200" height="130" alt="" src="/assets/images/subcategories/${element.name}-image.png" style="display:block;margin: 0px auto;max-height:78px;width: auto;" /></div>
                    <div class="rf-productnav-card-info">
                        <div><a href="#view_shop" onclick="CategoryService.getProductsBySubcategoryName(${element.name})" data-relatedlink=":r8:_link" data-slot-name="Shelf-0" data-display-name="AOS: home/shop_mac" data-autom="AOS: home/shop_mac" data-index="1" data-trigger-stoppropagation="true" style="color:rgb(29, 29, 31);display:block;font-family:'SF Pro Text', 'SF Pro Icons', 'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:14px;font-weight:600;letter-spacing:-0.224px;line-height:20.0003px;text-align:center;text-decoration:none solid rgb(29, 29, 31);white-space:nowrap;">${element.name}</a></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `;
      });
    });
  },
};
