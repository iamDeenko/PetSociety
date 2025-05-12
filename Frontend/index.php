<!DOCTYPE html>
<html lang="en">

<head>
    <title>PetSociety</title>
    <meta charset="utf-8">

    <!-- CSS styles -->
    <link rel="stylesheet" href="/assets/css/fonts.css">
    <link rel="stylesheet" href="/assets/css/shop.css">
    <link rel="stylesheet" href="/assets/css/index.css">
    <link rel="stylesheet" href="/assets/css/hero.css">
    <link rel="stylesheet" href="/assets/css/register-login.css">
    <link rel="stylesheet" href="/assets/css/product.css">
    <link rel="stylesheet" href="https://cdn.fluenticon.com/icon.min.css" /> 
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../node_modules/@fortawesome/fontawesome-free/css/all.min.css">
    <base href="/" />
</head>

<body>

    <!-- Navigation bar -->
    <nav id="navbar" class="navbar">
        <div class="col-md-12 text-center d-flex justify-content-center align-items-center">
            <div class="col-md-2 d-flex gap-5 justify-content-center align-items-center">
                <span> 
                    <a href="/">Home</a>
                </span>
                <span id="menu-shop">
                    <a href="/shop/pets/dogs" id="shop-link">Shop</a>
          
                </span>
            </div>
            <div class="col-md-4 navbar-brand">
                PetSociety
            </div>
            <div class="col-md-2 d-flex gap-5 justify-content-center align-items-center">
                <span>
                    Register
                </span>
                <span>
                    Cart
                </span>
            </div>
        </div>
    </nav>

    <!-- Shop flydown menu -->
    <div class="shop-flydown-menu" id="shop-flydown-menu">
        <div class="container mt-5 text-center">
            <div class="row">
                <div class="col-md-3 d-flex flex-column">
                    <a href="/shop/pets" class="shop-category">Pets</a>
                    <a href="/shop/pets/dogs" data-navigo>Dogs</a>
                    <a href="/shop/pets/cats" data-navigo>Cats</a>
                    <a href="/shop/pets/small-animals" data-navigo>Small Animals</a>
                    <a href="/shop/pets/birds" data-navigo>Birds</a>
                    <a href="/shop/pets/fish" data-navigo>Fish</a>
                    <a href="/shop/pets/reptiles" data-navigo>Reptiles</a>
                    <a href="/shop/pets/amphibians" data-navigo>Amphibians</a>
                </div>
                <div class="col-md-3 d-flex flex-column">
                    <a class="shop-category">Accessories</a>
                    <a href="#accessories-leashes">Leashes</a>
                    <a href="#accessories-bowls">Bowls</a>
                    <a href="#accessories-carriers">Carriers</a>
                    <a href="#accessories-grooming-tools">Grooming Tools</a>
                    <a href="#accessories-travel-accessories">Travel Accessories</a>
                </div>
                <div class="col-md-3 d-flex flex-column">
                    <a class="shop-category">Food</a>
                    <a href="#food-dry-food">Dry Food</a>
                    <a href="#food-wet-food">Wet Food</a>
                    <a href="#food-treats">Treats</a>
                    <a href="#food-supplements">Supplements</a>
                </div>
                <div class="col-md-3 d-flex flex-column">
                    <a class="shop-category">Toys</span>
                        <a href="#toys-chewing">Chewing</a>
                        <a href="#toys-interactive">Interactive</a>
                        <a href="#toys-fetch-retrieve">Fetch & Retrieve</a>
                </div>
            </div>
        </div>
    </div>


    <!-- Main dynamic page content container -->
    <main id="app">

    </main>

    <!-- Cart flyout -->
    <div class="shop-container" id="shoppingcart">
        <i class="fa-solid fa-cart-shopping"></i>
    </div>

    <div class="cartflyout" id="cart-modal">
        <div class="spansection">
            <span class="shoppingcartspan"></span>
            <span class="shoppingcartspan"></span>
        </div>
        <div class="shoppingcart-items">
            <div class="shoppingcart-item">
                <p>Test test</p>
                <p>Price: $200</p>
            </div>
            <!-- Sample items; will be dynamic later -->
        </div>
    </div>

    <!-- Scripts -->
    <script src="https://code.jquery.com/jquery-3.1.0.min.js" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://unpkg.com/navigo@8"></script>
    <script src="/assets/js/script.js"></script>

    <script src="/assets/js/navigation.js"></script>

</body>

</html>