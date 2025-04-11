const router = new Navigo('/', { hash: false });

function loadPage(page) {
    fetch(`tpl/${page}.html`)
        .then(res => {
            if (!res.ok) throw new Error("404");
            return res.text();
        })
        .then(html => {
            document.getElementById('app').innerHTML = html;
        })
        .catch(() => {
            document.getElementById('app').innerHTML = '<h1>404 - Page Not Found</h1>';
        });
}

router
    .on('/', () => loadPage('view_main'))
    .on('/register', () => loadPage('register'))
    .on('/login', () => loadPage('login'))
    .on('/shop', () => loadPage('view_dogs'))
    .on('/shop/pets/dogs', () => loadPage('view_dogs'))
    .on('/shop/pets/cats', () => loadPage('view_dogs'))
    .on('/product', () => loadPage('view_product'))
    .notFound(() => {
        document.getElementById('app').innerHTML = '<h1>404 - Not Found</h1>';
    })
    .resolve();

router.updatePageLinks().resolve();
