function navigate(path) {
    history.pushState({}, "", path);
    loadView(path);
}

function loadView(path) {
    const view = path.replace("/", "") || "home";
    fetch(`tpl/${view}.html`)
        .then(res => res.text())
        .then(html => {
            document.getElementById("content").innerHTML = html;
        });
}

window.addEventListener("popstate", () => {
    loadView(location.pathname);
});

window.addEventListener("DOMContentLoaded", () => {
    loadView(location.pathname);
});
