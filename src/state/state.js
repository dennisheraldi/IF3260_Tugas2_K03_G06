// Define the state of the app
const initialState = {
    // Initial state
    model: hollowCube,
    model_type: "preserved",
    projection_type: "orthographic", // "orthographic" or "perspective" or "oblique"
    view_field: 90, // 0 - 180,
    f_factor: 0.5, // 0 - 1
    beta_angle: 45, // 0 - 360
    is_shading: false, // true or false
    rotation: {
        x: 0,
        y: 0,
        z: 0,
    },
    translation: {
        x: 0,
        y: 0,
        z: 0,
    },
    scaling: {
        x: 1,
        y: 1,
        z: 1,
    },
    camera_radius: 0,
    camera_angle: 0,
    center_points: [0, 0, 0],
};

// freeze initialState
var state = JSON.parse(JSON.stringify(initialState));

function updateState() {
    state.projection_type = document.querySelector(
        'input[name="projection"]:checked'
    ).value;
    state.view_field = document.getElementById("view-field").value;
    state.f_factor = document.getElementById("f-factor").value;
    state.beta_angle = document.getElementById("beta-angle").value;
    state.is_shading = document.querySelector(
        '.toggle-switch input[type="checkbox"]'
    ).checked;
    state.rotation.x = document.getElementById("rotasi-x").value;
    state.rotation.y = document.getElementById("rotasi-y").value;
    state.rotation.z = document.getElementById("rotasi-z").value;
    state.translation.x = document.getElementById("translasi-x").value;
    state.translation.y = document.getElementById("translasi-y").value;
    state.translation.z = document.getElementById("translasi-z").value;
    state.scaling.x = document.getElementById("scaling-x").value;
    state.scaling.y = document.getElementById("scaling-y").value;
    state.scaling.z = document.getElementById("scaling-z").value;
    state.camera_radius = document.getElementById("camera-radius").value;
    state.camera_angle = document.getElementById("camera-angle").value;
}

function resetState() {
    state = JSON.parse(JSON.stringify(initialState));
    document.getElementById("view-field").value = state.view_field;
    document.getElementById("value-view-field").innerHTML = state.view_field;
    document.getElementById("f-factor").value = state.f_factor;
    document.getElementById("value-f-factor").innerHTML = state.f_factor;
    document.getElementById("beta-angle").value = state.beta_angle;
    document.getElementById("value-beta-angle").innerHTML = state.beta_angle;
    document.getElementById("rotasi-x").value = state.rotation.x;
    document.getElementById("value-rotasi-x").innerHTML = state.rotation.x;
    document.getElementById("rotasi-y").value = state.rotation.y;
    document.getElementById("value-rotasi-y").innerHTML = state.rotation.y;
    document.getElementById("rotasi-z").value = state.rotation.z;
    document.getElementById("value-rotasi-z").innerHTML = state.rotation.z;
    document.getElementById("translasi-x").value = state.translation.x;
    document.getElementById("value-translasi-x").innerHTML =
        state.translation.x;
    document.getElementById("translasi-y").value = state.translation.y;
    document.getElementById("value-translasi-y").innerHTML =
        state.translation.y;
    document.getElementById("translasi-z").value = state.translation.z;
    document.getElementById("value-translasi-z").innerHTML =
        state.translation.z;
    document.getElementById("scaling-x").value = state.scaling.x;
    document.getElementById("value-scaling-x").innerHTML = state.scaling.x;
    document.getElementById("scaling-y").value = state.scaling.y;
    document.getElementById("value-scaling-y").innerHTML = state.scaling.y;
    document.getElementById("scaling-z").value = state.scaling.z;
    document.getElementById("value-scaling-z").innerHTML = state.scaling.z;
    document.getElementById("camera-radius").value = state.camera_radius;
    // document.getElementById("value-camera-radius").innerHTML = state.camera_radius;
    document.getElementById("camera-angle").value = state.camera_angle;
    document.getElementById("value-camera-angle").innerHTML =
        state.camera_angle;
}

// set listener to reset-btn
document.getElementById("reset-btn").addEventListener("click", (e) => {
    const holder = state.model;
    resetState();
    state.model = holder;
    drawScene();
});

models = [hollowCube, hollowPrism, takodachi];
// set listener to model selection radio buttons
var modelSelection = document.querySelectorAll('input[name="model"]');
modelSelection.forEach((model) => {
    model.addEventListener("change", (e) => {
        state.model = models[e.target.value];
        state.model_type = "preserved";
        drawScene();
    });
});
