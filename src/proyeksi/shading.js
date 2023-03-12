var isShading = false;

const toggleSwitch = document.querySelector(
    '.toggle-switch input[type="checkbox"]'
);
toggleSwitch.addEventListener("change", function () {
    gl = null;
    program = null;

    var gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    if (this.checked) {
        // do something when the switch is on
        document.getElementById("on-off-label").innerHTML = "ON";
        isShading = true;
    } else {
        // do something when the switch is off
        document.getElementById("on-off-label").innerHTML = "OFF";
        isShading = false;
    }

    drawScene();
});
