const radioButtons = document.querySelectorAll(
    'input[type="radio"][name="projection"]'
);
const fovSliderContainer = document.querySelector(".slider-view-field-container");
const ffactorSliderContainer = document.querySelector(".slider-f-factor-container");
const betaAngleSliderContainer = document.querySelector(".slider-beta-angle-container");

for (const radioButton of radioButtons) {
    radioButton.addEventListener("change", (event) => {
        if (event.target.value === "perspective") {
            fovSliderContainer.style.display = "flex";
            drawScene();
        } else {
            fovSliderContainer.style.display = "none";
            drawScene();
        }

        if (event.target.value === "oblique") {
            ffactorSliderContainer.style.display = "flex";
            betaAngleSliderContainer.style.display = "flex";
            drawScene();
        } else {
            ffactorSliderContainer.style.display = "none";
            betaAngleSliderContainer.style.display = "none";
            drawScene();
        }
    });
}

var fieldOfView = document.getElementById("view-field").value;
var fFactor = document.getElementById("f-factor").value;
var betaAngle = document.getElementById("beta-angle").value;

document.getElementById("view-field").addEventListener("input", (e) => {
    drawScene();
});
document.getElementById("f-factor").addEventListener("input", (e) => {
    drawScene();
});
document.getElementById("beta-angle").addEventListener("input", (e) => {
    drawScene();
});