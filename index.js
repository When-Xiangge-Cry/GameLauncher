function switchPage(page) {
    let pageName = page.dataset.page;
    let path = location.href.split("/").slice(-1); 
    if(pageName != path) {
        window.location.href=pageName;
    }
}