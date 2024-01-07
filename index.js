function switchPage(page) {
    let pageName = page.dataset.page;
    let path = location.href.split("/").slice(-1); 
    if(pageName != path) {
        window.location.href=pageName;
    }
}

function resizeTitle() {
    const targetHeight = 1440;
    const targetWidth = 2560;

    const h = window.innerHeight;
    const w = window.innerWidth;
    const zoomH = h / targetHeight;
    const zoomW = w / targetWidth;
    const zoomH2 = w / targetHeight;
    const zoomW2 = h / targetWidth;
    let mh = (targetHeight - h) / 2;
    let mw = (targetWidth - w) / 2;
    let mh2os = targetWidth / 2 - w / 2;
    let mw2os = targetHeight / 2 - h / 2;
    const root = document.getElementById('body');
    if (root) {
        if (w > h) {
            mw = -mw;
            mh = -mh;
            if (w * (9 / 16) >= h) {
                root.style.transform = `translate(${mw}px, ${mh}px) scale(${zoomH},${zoomH})`;
            }
            if (w * (9 / 16) < h) {
                root.style.transform = `translate(${mw}px, ${mh}px) scale(${zoomW},${zoomW})`;
            }
        } else {
            mw2os = -mw2os;
            if (h * (9 / 16) >= w) {
                root.style.transform = `rotate(90deg) translate(${mw2os}px, ${mh2os}px) scale(${zoomH2},${zoomH2})`;
            }
            if (h * (9 / 16) < w) {
                root.style.transform = `rotate(90deg) translate(${mw2os}px, ${mh2os}px) scale(${zoomW2},${zoomW2})`;
            }
        }
    }
}