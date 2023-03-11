var translasi = {
    x: document.getElementById("translasi-x").value,
    y: document.getElementById("translasi-y").value,
    z: document.getElementById("translasi-z").value,
};

// Event listener for translasi
document.getElementById("translasi-x").addEventListener("input", (e) => {
    translasi.x = e.target.value;
    drawScene();
});

document.getElementById("translasi-y").addEventListener("input", (e) => {
    translasi.y = e.target.value;
    drawScene();
});

document.getElementById("translasi-z").addEventListener("input", (e) => {
    translasi.z = e.target.value;
    drawScene();
});
