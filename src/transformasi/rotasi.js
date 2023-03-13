// Event listener for rotasi
document.getElementById("rotasi-x").addEventListener("input", (e) => {
    drawScene();
});

document.getElementById("rotasi-y").addEventListener("input", (e) => {
    drawScene();
});

document.getElementById("rotasi-z").addEventListener("input", (e) => {
    drawScene();
});

// Convert degree to radian
function degToRad(d) {
    return (d * Math.PI) / 180;
}
