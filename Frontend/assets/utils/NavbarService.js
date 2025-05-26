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
            <div class="col-md-12 text-center d-flex justify-content-center align-items-center">
            <div class="col-md-2 d-flex gap-5 justify-content-center align-items-center">
                <span>
                    <a href="/">Home</a>
                </span>
                <span id="menu-shop">
                    <a href="#view_shop" onclick="NavbarService.showMore()">Shop</a>
                </span>
            </div>
            <div class="col-md-4 navbar-brand">
                PetSociety
            </div>
            <div class="col-md-2 d-flex gap-5 justify-content-center align-items-center">
                <span>
                    <a href="#view_cart">Cart</a>
                </span>
                <span>
                    <a href="#view_admin">Dashboard</a>
                </span>
                <span>
                    <a onclick = "AuthService.logOut()">Logout</a>
                </span>
            </div>
        </div>
    `;
  },

  renderUserNavbar: function () {
    const navbar = document.getElementById("navbar");

    navbar.innerHTML = "";

    navbar.innerHTML = `
            <div class="col-md-12 text-center d-flex justify-content-center align-items-center">
            <div class="col-md-2 d-flex gap-5 justify-content-center align-items-center">
                <span>
                    <a href="/">Home</a>
                </span>
                <span id="menu-shop">
                    <a onclick="NavbarService.showMore()">Shdop</a>
                </span>
            </div>
            <div class="col-md-4 navbar-brand">
                PetSociety
            </div>
            <div class="col-md-2 d-flex gap-5 justify-content-center align-items-center">
                <span>
                    <a href="#view_cart">Cart</a>
                </span>
                <span>
                    <a onclick = "AuthService.logOut()">Logout</a>
                </span>
            </div>
        </div>
    `;
  },
  renderNavbar: function () {
    const navbar = document.getElementById("navbar");

    navbar.innerHTML = "";

    navbar.innerHTML = `
            <div class="col-md-12 text-center d-flex justify-content-center align-items-center">
            <div class="col-md-2 d-flex gap-5 justify-content-center align-items-center">
                <span>
                    <a href="/">Home</a>
                </span>
                <span id="menu-shop">
                    <a href="#view_shop">Shop</a>

                </span>
            </div>
            <div class="col-md-4 navbar-brand">
                PetSociety
            </div>
            <div class="col-md-2 d-flex gap-5 justify-content-center align-items-center">
                <span>
                    <a href="#view_cart">Cart</a>
                </span>
                <span>
                    <a href="#view_login">Login</a>
                </span>
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
