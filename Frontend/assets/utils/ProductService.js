let ProductService = {
  __init: function () {
    const productItemsDiv = document.getElementById("product-items-div");

    RestClient.get(
      "/shop/pets",
      function (data) {
        console.log(data);
        productItemsDiv.innerHTML = "";
        for (pet of data) {
          console.log(pet);

          productItemsDiv.innerHTML += `
          <div class="product-item" data-id=${pet.product_id}>
           <div class="product-item-image">
             <img src="assets/${pet.image_url}" />
           </div>
           <div class="product-item-info text-start d-flex flex-column">
             <span>
               <h5>${pet.product_name}</h5>
               <span>/ ${pet.subcategory_name}</span>
             </span>
             <span>$${pet.price}</span>
           </div>
         </div>
         
         `;
        }
      },
      function (error) {
        console.log(error);
      }
    );
  },

  getByCategory: function () {
    console.log("123 test");

    const categoryField = document.getElementById("category-select");
    const whichCategory = document.getElementById("whichcategory");
    const productItemsDiv = document.getElementById("product-items-div");

    const selected = categoryField.value;

    console.log(selected);

    RestClient.get(
      "/shop/" + selected,
      function (data) {
        whichCategory.innerHTML = "";
        whichCategory.innerHTML = `${selected}`;
        console.log(data);
        productItemsDiv.innerHTML = "";
        for (pet of data) {
          console.log(pet);

          productItemsDiv.innerHTML += `
          <div class="product-item" data-id=${pet.product_id}>
           <div class="product-item-image">
             <img src="assets/${pet.image_url}" />
           </div>
           <div class="product-item-info text-start d-flex flex-column">
             <span>
               <h5>${pet.product_name}</h5>
               <span>/ ${pet.subcategory_name}</span>
             </span>
             <span>$${pet.price}</span>
           </div>
         </div>
         
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
};
