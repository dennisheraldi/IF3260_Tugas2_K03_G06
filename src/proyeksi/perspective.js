const radioButtons = document.querySelectorAll(
    'input[type="radio"][name="projection"]'
);
const sliderContainer = document.querySelector(".slider-view-field-container");

for (const radioButton of radioButtons) {
    radioButton.addEventListener("change", (event) => {
        if (event.target.value === "perspective") {
            sliderContainer.style.display = "flex";
            drawScene();
        } else {
            sliderContainer.style.display = "none";
            drawScene();
        }
    });
}

var fieldOfView = document.getElementById("view-field").value;

document.getElementById("view-field").addEventListener("input", (e) => {
    fieldOfView = e.target.value;
    drawScene();
});
