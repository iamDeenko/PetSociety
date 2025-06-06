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
  <div class="align-items-center flex-column gap-2" id = "logo-container">
    <span class="navbar-brand"> PetSociety </span>
  </div>

  <!-- Center: Navigation Links -->
  <div class="d-flex align-items-center justify-content-between  gap-5">
 
    
    <a href="#view_shop" onclick="NavbarService.showMore()" class="d-flex flex-column align-items-center text-decoration-none text-dark">
      <span>Shop</span>
    </a>

    <a href="/" class="d-flex flex-column align-items-center text-decoration-none text-dark">
      <span>Home</span>
    </a>

    <a href="#view_cart" class="d-flex flex-column align-items-center text-decoration-none text-dark">
      <span>Cart</span>
    </a>
  </div>

  <!-- Right: Admin + Logout -->
  <div class="d-flex align-items-center ml-5 gap-4">
    <a href="#view_admin" class="d-flex flex-column align-items-center text-decoration-none text-dark">
      <span>Admin</span>
    </a>

    <a onclick="AuthService.logOut()" class="d-flex flex-column align-items-center text-decoration-none text-dark" style="cursor:pointer;">

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
  <div class="align-items-center flex-column gap-2" id = "logo-container">
    <span class="navbar-brand"> PetSociety </span>
  </div>

  <!-- Center: Navigation Links -->
  <div class="d-flex align-items-center justify-content-between  gap-5">
 
    
    <a href="#view_shop" onclick="NavbarService.showMore()" class="d-flex flex-column align-items-center text-decoration-none text-dark">

      <span>Shop</span>
    </a>

    <a href="/" class="d-flex flex-column align-items-center text-decoration-none text-dark">

      <span>Home</span>
    </a>

    <a href="#view_cart" class="d-flex flex-column align-items-center text-decoration-none text-dark">

      <span>Cart</span>
    </a>
  </div>

  <!-- Right:  Logout -->
  <div class="d-flex align-items-center ml-5 gap-4">
    <a onclick="AuthService.logOut()" class="d-flex flex-column align-items-center text-decoration-none text-dark" style="cursor:pointer;">
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
    <span class="navbar-brand"> PetSociety </span>
  </div>

  <!-- Center: Navigation Links -->
  <div class="d-flex align-items-center justify-content-between  gap-5">
    <a href="#view_shop" onclick="NavbarService.showMore()" class="d-flex flex-column align-items-center text-decoration-none text-dark">

      <span>Shop</span>
    </a>

    <a href="/" class="d-flex flex-column align-items-center text-decoration-none text-dark">

      <span>Home</span>
    </a>

    <a href="#view_cart" class="d-flex flex-column align-items-center text-decoration-none text-dark">

      <span>Cart</span>
    </a>
  </div>

  <!-- Right: Admin + Logout -->
  <div class="d-flex align-items-center ml-5 gap-4">

    <a href="#view_login" class="d-flex flex-column align-items-center text-decoration-none text-dark" style="cursor:pointer;">
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
