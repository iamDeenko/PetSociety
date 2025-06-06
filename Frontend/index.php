<!DOCTYPE html>
<html lang="en">

<head>
    <title>PetSociety</title>
    <meta charset="utf-8">

    <!-- CSS styles -->
    <link rel="stylesheet" href="/assets/css/animations.css">
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

<body class="container">




    <nav id="navbar">

    </nav>






    <!-- Main dynamic page content container -->
    <main id="spapp" role="main">
        <section id="view_error"></section>
        <section id="view_login"></section>
        <section id="view_register"></section>
        <section id="view_product"></section>
        <section id="view_shop"></section>
        <section id="view_admin"></section>
        <section id="view_cart"></section>
        <section id="view_main" data-load="view_main.html"></section>
    </main>


    <script src="./assets/utils/AdminService.js"></script>
    <script src="./assets/utils/Constants.js"></script>
    <script src="./assets/utils/RestClient.js"></script>
    <script src="./assets/utils/CartService.js"></script>
    <script src="./assets/utils/CategoryService.js"></script>
    <script src="./assets/utils/AuthService.js"></script>
    <script src="./assets/utils/NavbarService.js"></script>
    <script src="./assets/utils/ProductService.js"></script>
    <script src="./assets/utils/UserService.js"></script>
    <script src="./assets/utils/OrderService.js"></script>

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