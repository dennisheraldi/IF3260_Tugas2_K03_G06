var cameraAngleRadians = degToRad(
    document.getElementById("camera-angle").value
);

document.getElementById("camera-angle").addEventListener("input", (e) => {
    cameraAngleRadians = degToRad(e.target.value);
    drawScene();
});
