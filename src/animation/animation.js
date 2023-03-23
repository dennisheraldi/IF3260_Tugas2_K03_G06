let lastTime = 0;
let forward_x = true;
let forward_y = true;
let animationID;

function animate(currentTime) {
    const deltaTime = (currentTime - lastTime) / 1000; // hitung delta time dalam detik
    lastTime = currentTime;
    var velocity = 30;

    // lakukan animasi di sini dengan memperhitungkan delta time
    if (forward_x) {
        document.getElementById("rotasi-x").value =
            (parseFloat(document.getElementById("rotasi-x").value) +
                velocity * deltaTime) %
            360;

        if (document.getElementById("rotasi-x").value == 360) {
            forward_x = false;
        } else if (document.getElementById("rotasi-x").value == -360) {
            forward_x = true;
        }
    } else {
        document.getElementById("rotasi-x").value =
            (parseFloat(document.getElementById("rotasi-x").value) -
                velocity * deltaTime) %
            360;

        if (document.getElementById("rotasi-x").value == 360) {
            forward_x = false;
        } else if (document.getElementById("rotasi-x").value == -360) {
            forward_x = true;
        }
    }

    if (forward_y) {
        document.getElementById("rotasi-y").value =
            (parseFloat(document.getElementById("rotasi-y").value) +
                velocity * deltaTime) %
            360;

        if (document.getElementById("rotasi-y").value == 360) {
            forward_y = false;
        } else if (document.getElementById("rotasi-y").value == -360) {
            forward_y = true;
        }
    } else {
        document.getElementById("rotasi-y").value =
            (parseFloat(document.getElementById("rotasi-y").value) -
                velocity * deltaTime) %
            360;

        if (document.getElementById("rotasi-y").value == 360) {
            forward_y = false;
        } else if (document.getElementById("rotasi-y").value == -360) {
            forward_y = true;
        }
    }

    document.getElementById("value-rotasi-x").innerHTML =
        document.getElementById("rotasi-x").value;

    document.getElementById("value-rotasi-y").innerHTML =
        document.getElementById("rotasi-y").value;

    drawScene();

    animationID = requestAnimationFrame(animate);
    console.log(animationID);
}

const toggleSwitchAnimation = document.getElementById("switch-animation");
toggleSwitchAnimation.addEventListener("change", function () {
    if (this.checked) {
        // do something when the switch is on
        document.getElementById("on-off-label-animation").innerHTML = "ON";
        animationID = requestAnimationFrame(animate);
    } else {
        // do something when the switch is off
        document.getElementById("on-off-label-animation").innerHTML = "OFF";
        cancelAnimationFrame(animationID);
    }

    drawScene();
});
