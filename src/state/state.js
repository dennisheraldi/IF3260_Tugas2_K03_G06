// Define the state of the app
const initialState = {
    // Initial state
    model: hollowCube,
    projection_type: "orthographic", // "orthographic" or "perspective" or "oblique"
    view_field: 90, // 0 - 180,
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
        x: 0,
        y: 0,
        z: 0,
    },
    camera_radius: 0,
    camera_angle: 0,
};

var state = initialState;

function updateState() {
    // state.model = ...
    state.projection_type = document.querySelector(
        'input[name="projection"]:checked'
    ).value;
    state.view_field = document.getElementById("view-field").value;
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
