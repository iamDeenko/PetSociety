let NavbarService = {
  __init: function () {
    const navbar = document.getElementById("navbar");
    navbar.innerHTML = "";
    const userToken = localStorage.getItem("user_token");

    if (!userToken) {
      this.renderNavbar();
      return;
    }

    const decodedToken = jwt_decode(userToken);

    const isAdmin = decodedToken.user.is_admin;

    if (isAdmin === 1) {
      console.log("ADMIN LOGGED IN!");

      this.renderAdminNavbar();
    } else if (isAdmin === 0) {
      console.log("USER Logged in!!!");

      this.renderUserNavbar();
    }
  },

  renderAdminNavbar: function () {
    const navbar = document.getElementById("navbar");
    navbar.innerHTML = "";
    navbar.innerHTML = `
  
   <div class="container d-flex justify-content-between align-items-center px-4" style="height: 64px;">
  <!-- Left: Logo -->
  <div class="d-flex align-items-center flex-column gap-2" id = "logo-container">
    <img src="/assets/images/icons/logo.png" alt="logo" width="30" height="30">
  </div>

  <!-- Center: Navigation Links -->
  <div class="d-flex align-items-center justify-content-between  gap-5">
 
    
    <a href="#view_shop" onclick="NavbarService.showMore()" class="d-flex flex-column align-items-center text-decoration-none text-dark">
      <img src="/assets/images/icons/shop.png" alt="shop icon" width="30" height="30">
      <span>Shop</span>
    </a>

    <a href="/" class="d-flex flex-column align-items-center text-decoration-none text-dark">
      <img src="/assets/images/icons/home.png" alt="home icon" width="32" height="32">
      <span>Home</span>
    </a>

    <a href="#view_cart" class="d-flex flex-column align-items-center text-decoration-none text-dark">
      <img src="/assets/images/icons/cart.png" alt="cart icon" width="30" height="30">
      <span>Cart</span>
    </a>
  </div>

  <!-- Right: Admin + Logout -->
  <div class="d-flex align-items-center ml-5 gap-4">
    <a href="#view_admin" class="d-flex flex-column align-items-center text-decoration-none text-dark">
      <img src="/assets/images/icons/dashboard.png" alt="admin icon" width="30" height="30">
      <span>Admin</span>
    </a>

    <a onclick="AuthService.logOut()" class="d-flex flex-column align-items-center text-decoration-none text-dark" style="cursor:pointer;">
      <img src="/assets/images/icons/logout.png" alt="logout icon" width="30" height="30">
      <span>Log out</span>
    </a>
  </div>
</div>
     
    `;
  },

  renderUserNavbar: function () {
    const navbar = document.getElementById("navbar");

    navbar.innerHTML = "";

    navbar.innerHTML = `
  <div class="container d-flex justify-content-between align-items-center px-4" style="height: 64px;">
  <!-- Left: Logo -->
  <div class="d-flex align-items-center flex-column gap-2" id = "logo-container">
    <img src="/assets/images/icons/logo.png" alt="logo" width="30" height="30">
  </div>

  <!-- Center: Navigation Links -->
  <div class="d-flex align-items-center justify-content-between  gap-5">
 
    
    <a href="#view_shop" onclick="NavbarService.showMore()" class="d-flex flex-column align-items-center text-decoration-none text-dark">
      <img src="/assets/images/icons/shop.png" alt="shop icon" width="30" height="30">
      <span>Shop</span>
    </a>

    <a href="/" class="d-flex flex-column align-items-center text-decoration-none text-dark">
      <img src="/assets/images/icons/home.png" alt="home icon" width="32" height="32">
      <span>Home</span>
    </a>

    <a href="#view_cart" class="d-flex flex-column align-items-center text-decoration-none text-dark">
      <img src="/assets/images/icons/cart.png" alt="cart icon" width="30" height="30">
      <span>Cart</span>
    </a>
  </div>

  <!-- Right:  Logout -->
  <div class="d-flex align-items-center ml-5 gap-4">
    <a onclick="AuthService.logOut()" class="d-flex flex-column align-items-center text-decoration-none text-dark" style="cursor:pointer;">
      <img src="/assets/images/icons/logout.png" alt="logout icon" width="30" height="30">
      <span>Log out</span>
    </a>
  </div>
</div>
    `;
  },
  renderNavbar: function () {
    const navbar = document.getElementById("navbar");

    navbar.innerHTML = "";

    navbar.innerHTML = `
  <div class="container d-flex justify-content-between align-items-center px-4" style="height: 64px;">
  <!-- Left: Logo -->
  <div class="d-flex align-items-center flex-column gap-2" id = "logo-container">
    <img src="/assets/images/icons/logo.png" alt="logo" width="30" height="30">

  </div>

  <!-- Center: Navigation Links -->
  <div class="d-flex align-items-center justify-content-between  gap-5">
 
    
    <a href="#view_shop" onclick="NavbarService.showMore()" class="d-flex flex-column align-items-center text-decoration-none text-dark">
      <img src="/assets/images/icons/shop.png" alt="shop icon" width="30" height="30">
      <span>Shop</span>
    </a>

    <a href="/" class="d-flex flex-column align-items-center text-decoration-none text-dark">
      <img src="/assets/images/icons/home.png" alt="home icon" width="32" height="30">
      <span>Home</span>
    </a>

    <a href="#view_cart" class="d-flex flex-column align-items-center text-decoration-none text-dark">
      <img src="/assets/images/icons/cart.png" alt="cart icon" width="30" height="30">
      <span>Cart</span>
    </a>
  </div>

  <!-- Right: Admin + Logout -->
  <div class="d-flex align-items-center ml-5 gap-4">

    <a href="#view_login" class="d-flex flex-column align-items-center text-decoration-none text-dark" style="cursor:pointer;">
      <img src="/assets/images/icons/login.png" alt="logout icon" width="30" height="30">
      <span>Log in</span>
    </a>
  </div>
</div>
    `;
  },

  showMore: function () {
    const shopmenu = document.getElementById("shop-flydown-menu");

    if (!shopmenu) {
      console.error("Shop menu element not found");
    }

    console.log("Mouse over shop menu");

    shopFlyDownMenu.classList.add("show");
    navbar.style.borderBottom = "none";
    navbar.style.boxShadow = "none";
  },
};
