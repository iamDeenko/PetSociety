const shoppingCartDiv = document.getElementById('shoppingcart');
const cartflyout = document.getElementById('cart-modal');
const closeCart = document.querySelectorAll('.shoppingcartspan');

shoppingCartDiv.addEventListener('click', () => {
  cartflyout.classList.remove('inactive');
  cartflyout.classList.add('active');
  cartflyout.style.display = 'flex';
  shoppingCartDiv.style.display = 'none';
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
