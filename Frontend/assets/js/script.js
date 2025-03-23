const shoppingCartDiv = document.getElementById('shoppingcart');
const cartflyout = document.getElementById('cart-modal');
const closeCart = document.querySelectorAll('.shoppingcartspan');
const content = document.querySelector('#spapp');
const shopmenu = document.querySelector('#menu-shop');
const shopFlyDownMenu = document.querySelector('#shop-flydown-menu');
const navbar = document.querySelector('#navbar');

shopmenu.addEventListener('mouseover', () => {
  shopFlyDownMenu.classList.add('show');
  navbar.style.borderBottom = 'none';
  navbar.style.boxShadow = 'none';
});


shopFlyDownMenu.addEventListener('mouseleave', () => {
  shopFlyDownMenu.classList.remove('show');
  navbar.style.borderBottom = '1px solid #eee';
  navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
});

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
// Add this JavaScript to your script.js file

// Select the login span element - note the correction from #login to #\#login
const loginSpan = document.querySelector('span#\\#login');
const loginPopup = document.getElementById('login-popup');
const closeLoginBtn = document.querySelector('.close-login');
const loginButton = document.getElementById('login-button');

// Show the login popup when clicking on the login span
loginSpan.addEventListener('click', () => {
  loginPopup.style.display = 'block';
  document.body.style.overflow = 'hidden'; // Prevent scrolling while popup is open
});

// Close the login popup when clicking the close button
closeLoginBtn.addEventListener('click', () => {
  loginPopup.style.display = 'none';
  document.body.style.overflow = 'auto'; // Re-enable scrolling
});

// Close the login popup when clicking outside the popup content
window.addEventListener('click', (event) => {
  if (event.target === loginPopup) {
    loginPopup.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

// Handle login form submission
loginButton.addEventListener('click', (e) => {
  e.preventDefault();

  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  if (email && password) {
    // For demo purposes, auto-login without validation
    // In a real application, you would validate credentials with a server

    console.log('User logged in:', email);
    loginPopup.style.display = 'none';
    document.body.style.overflow = 'auto';

    // Simulate successful login
    alert('Successfully logged in!');

    // Optional: Redirect to dashboard or update UI to show logged-in state
    // window.location.href = '#dashboard';
  } else {
    alert('Please fill in all fields');
  }
});