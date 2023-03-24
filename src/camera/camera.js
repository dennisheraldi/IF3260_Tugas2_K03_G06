var cameraAngleRadians = degToRad(
    document.getElementById("camera-angle").value
);

document.getElementById("camera-angle").addEventListener("input", (e) => {
    cameraAngleRadians = degToRad(e.target.value);
    drawScene();
});

var cameraRadius = document.getElementById("camera-radius").value;

document.getElementById("camera-radius").addEventListener("input", (e) => {
    cameraRadius = e.target.value;
    drawScene();
});
