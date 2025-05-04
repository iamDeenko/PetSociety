const shoppingCartDiv = document.getElementById('shoppingcart');
const cartflyout = document.getElementById('cart-modal');
const closeCart = document.querySelectorAll('.shoppingcartspan');
const content = document.querySelector('#spapp');
const shopmenu = document.querySelector('#menu-shop');
const shopFlyDownMenu = document.querySelector('#shop-flydown-menu');
const navbar = document.querySelector('#navbar');
const categoriesdiv = document.querySelector('#categories-div');



shopmenu.addEventListener('mouseover', () => {
  shopFlyDownMenu.classList.add('show');
  navbar.style.borderBottom = 'none';
  navbar.style.boxShadow = 'none';


});



shopFlyDownMenu.addEventListener('mouseleave', () => {
  shopFlyDownMenu.classList.remove('show');
  navbar.style.borderBottom = '1px solid #eee';
  navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';

  console.log("123");

});

shoppingCartDiv.addEventListener('click', () => {
  cartflyout.classList.remove('inactive');
  cartflyout.classList.add('active');
  cartflyout.style.display = 'flex';
  shoppingCartDiv.style.display = 'none';
  console.log("123");
});

closeCart.forEach(span => {
  span.addEventListener('click', () => {
    cartflyout.classList.add('inactive');
    cartflyout.classList.remove('active');
    setTimeout(() => {
      shoppingCartDiv.style.display = 'block';
      cartflyout.style.display = 'none';
    }, 100);
  });
});




if(
  $(document).ready()){
   
    const appContainer = document.getElementById('app') || document.body; 
    
    const test = appContainer.closest('#testid');

    if(test){

      console.log(testid);
    }
  }