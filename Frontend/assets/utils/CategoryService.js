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
        console.log(element);

        allSubcats.innerHTML += `

  <div style="padding-bottom:40px;padding-top:16px;">
    <div  style="display:block;scroll-snap-align:start;">
        <div >
            <div >
                <div style="border-radius:18px;box-sizing:border-box;min-width:193px;padding:18px 8px 16px;">
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

      const scrollAmount = 200;
      const backwards = document.getElementById("backwards");

      backwards.addEventListener("click", function () {
        console.log("123");

        allSubcats.scrollBy({
          left: -scrollAmount,
          behavior: "smooth",
        });
      });

      const forwards = document.getElementById("forwards");

      forwards.addEventListener("click", function () {
        console.log("Scrolling forwards");

        allSubcats.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      });
    });

    allSubcats.addEventListener("scroll", function () {
      console.log("Scroll ended. Checking position...");

      // Check if scrolled to the very left
      if (allSubcats.scrollLeft === 0) {
        console.log("MAX SCROLL REACHED: At the very beginning (left).");
      }

      // Check if scrolled to the very right
      // We use Math.ceil on scrollLeft and add clientWidth.
      // Compare with scrollWidth. Sometimes, due to subpixel rendering,
      // scrollLeft + clientWidth might be a fraction less than scrollWidth.
      // A small tolerance (e.g., >= scrollWidth - 1) or Math.ceil can help.
      const atRightEnd =
        Math.ceil(allSubcats.scrollLeft) + allSubcats.clientWidth >=
        allSubcats.scrollWidth;

      if (atRightEnd) {
        // It's possible for content to be smaller than the container,
        // in which case it might be "at the right end" and also at scrollLeft 0.
        // You might want to add a check if scrollWidth > clientWidth if that's an issue.
        if (
          allSubcats.scrollWidth > allSubcats.clientWidth &&
          allSubcats.scrollLeft > 0
        ) {
          console.log("MAX SCROLL REACHED: At the very end (right).");
        } else if (allSubcats.scrollWidth <= allSubcats.clientWidth) {
          console.log(
            "Content fits or is smaller than container. No scrolling needed or at right end by default."
          );
        }
      }

      console.log(
        `Current scrollLeft: ${allSubcats.scrollLeft}, clientWidth: ${allSubcats.clientWidth}, scrollWidth: ${allSubcats.scrollWidth}`
      );
    });
  },
};
