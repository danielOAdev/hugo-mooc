import "../panzoom/panzoom.min.js";
const image = document.getElementById('image');
image.panZoom = panzoom(image, {
    zoomSpeed: 0.045,
    maxZoom: 3,
    minZoom: 1,
    bounds: true,
    boundsPadding: 1,
    zoomDoubleClickSpeed: 1.5
});

image.addEventListener('dblclick', function(e) {
    this.panZoom.pause();
    const offsetX = e.clientX - this.offsetLeft
    const offsetY = e.clientY - this.offsetTop;
    const xys = this.panZoom.getTransform();
    if(xys.scale >= 2) {
        const fScale = 1 - xys.scale
        const fixeX = xys.x / fScale
        const fixeY = xys.y / fScale
        this.panZoom.smoothZoomAbs(fixeX, fixeY, 0.99)
    } else {
        this.panZoom.smoothZoomAbs(offsetX, offsetY, xys.scale * 1.5);
    }
});

image.addEventListener('touchend', function(e) {
    const xys = this.panZoom.getTransform();
    if(xys.scale >= 2 && e.touches.length <= 0) {
        const lastTouch = this.panZoom.lastTouch;
        this.panZoom.lastTouch = (new Date).getTime();
        if (lastTouch + 300 > (new Date).getTime()) {
            const fScale = 1 - xys.scale
            const fixeX = xys.x / fScale
            const fixeY = xys.y / fScale
            this.panZoom.pause();
            this.panZoom.smoothZoomAbs(fixeX, fixeY, 0.99)
        }
    }
});

image.panZoom.on('transform', function(instance) {
    if (instance.isPaused()) {
        instance.resume();
    }
});