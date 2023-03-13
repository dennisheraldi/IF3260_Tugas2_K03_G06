const toggleSwitch = document.querySelector(
    '.toggle-switch input[type="checkbox"]'
);
toggleSwitch.addEventListener("change", function () {
    if (this.checked) {
        // do something when the switch is on
        document.getElementById("on-off-label").innerHTML = "ON";
    } else {
        // do something when the switch is off
        document.getElementById("on-off-label").innerHTML = "OFF";
    }

    drawScene();
});
