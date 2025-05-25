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
    <link rel="stylesheet" href="/assets/css/spapp.css">
    <link rel="stylesheet" href="https://cdn.fluenticon.com/icon.min.css" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../node_modules/@fortawesome/fontawesome-free/css/all.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css">
    <base href="/" />
</head>

<body>




    <nav id="navbar" class="navbar">

    </nav>


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
    <main id="spapp" role="main">
        <section id="view_login"></section>
        <section id="view_register"></section>
        <section id="view_dogs"></section>
        <section id="view_main" data-load="view_main.html"></section>
    </main>





    <script src="./assets/utils/Constants.js"></script>
    <script src="./assets/utils/RestClient.js"></script>
    <script src="./assets/utils/AuthService.js"></script>
    <script src="./assets/utils/NavbarService.js"></script>
    <script src="./assets/utils/ProductService.js"></script>
    <!-- Scripts -->
    <script src="https://code.jquery.com/jquery-3.7.0.js"
        integrity="sha256-JlqSTELeR4TLqP0OG9dxM7yDPqX1ox/HfgiSLBj8+kM=" crossorigin="anonymous"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.5/jquery.validate.min.js"
        integrity="sha512-rstIgDs0xPgmG6RX1Aba4KV5cWJbAMcvRCVmglpam9SoHZiUCyQVDdH2LPlxoHtrv17XWblE/V/PP+Tr04hbtA=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://code.jquery.com/jquery-3.1.0.min.js" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://unpkg.com/navigo@8"></script>
    <script src="/assets/js/script.js"></script>
    <script src="/assets/js/custom.js"></script>
    <script src="/assets/js/jquery.spapp.js"></script>


    <script src="https://cdn.jsdelivr.net/npm/jwt-decode@latest/build/jwt-decode.min.js"></script>


    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>



</body>

</html>


<script>
    NavbarService.__init()
</script>