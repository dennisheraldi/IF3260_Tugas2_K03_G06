var rotasi = {
    x: document.getElementById("rotasi-x").value,
    y: document.getElementById("rotasi-y").value,
    z: document.getElementById("rotasi-z").value,
};

// Event listener for rotasi
document.getElementById("rotasi-x").addEventListener("input", (e) => {
    rotasi.x = e.target.value;
});

document.getElementById("rotasi-y").addEventListener("input", (e) => {
    rotasi.y = e.target.value;
});

document.getElementById("rotasi-z").addEventListener("input", (e) => {
    rotasi.z = e.target.value;
});

// Convert degree to radian
function degToRad(d) {
    return (d * Math.PI) / 180;
}
