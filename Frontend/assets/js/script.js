const shoppingCartDiv = document.getElementById("shoppingcart");
const cartflyout = document.getElementById("cart-modal");
const closeCart = document.querySelectorAll(".shoppingcartspan");
const content = document.querySelector("#spapp");
const shopmenu = document.querySelector("#menu-shop");
const shopFlyDownMenu = document.querySelector("#shop-flydown-menu");
const navbar = document.querySelector("#navbar");
const categoriesdiv = document.querySelector("#categories-div");

shopmenu.addEventListener("mouseover", () => {
  shopFlyDownMenu.classList.add("show");
  navbar.style.borderBottom = "none";
  navbar.style.boxShadow = "none";
});

shopFlyDownMenu.addEventListener("mouseleave", () => {
  shopFlyDownMenu.classList.remove("show");
  navbar.style.borderBottom = "1px solid #eee";
  navbar.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";

  console.log("123");
});

if ($(document).ready()) {
  const registrationForm = document.getElementById("registrationForm");

  const appContainer = document.getElementById("app") || document.body;

  const test = appContainer.closest("#testid");

  if (registrationForm) {
    console.log("testtest");
  }

  if (test) {
    console.log(testid);
  }
}
