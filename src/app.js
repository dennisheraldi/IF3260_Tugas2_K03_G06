// Get the canvas element
var canvas = document.getElementById("canvas");

// Create a WebGL context
var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

if (!gl) {
    alert("Your browser does not support WebGL");
}
// Setup GLSL program
var program = createProgram(gl, vertexShaderText, fragmentShaderText);

// Get attribute locations
var positionAttribLocation = gl.getAttribLocation(program, "a_position");
var colorAttribLocation = gl.getAttribLocation(program, "a_color");
var matrixUniformLocation = gl.getUniformLocation(program, "u_matrix");

// Create position buffer
var positionBuffer = gl.createBuffer();

// Create color buffer
var colorBuffer = gl.createBuffer();

// Set position and color buffer
function setPositionColorBuffer(position, color) {
    // Set position buffer
    setBuffer(gl, positionBuffer, position, positionAttribLocation, 3);

    // Set color buffer
    setBuffer(gl, colorBuffer, color, colorAttribLocation, 3);
}

function drawScene() {
    // Set the viewport
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Clear the canvas
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Turn on culling. By default backfacing triangles
    // will be culled.
    gl.enable(gl.CULL_FACE);

    // Enable the depth buffer
    gl.enable(gl.DEPTH_TEST);

    // Use the program (shaders)
    gl.useProgram(program);

    // Compute the matrix
    // var matrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    var left = -1;
    var right = 1;
    var bottom = -1;
    var top = 1;
    var near = 1;
    var far = -1;

    var matrix = m4.orthographic(left, right, bottom, top, near, far);

    if (document.getElementById("perspective").checked) {
        matrix = m4.perspective(
            degToRad(fieldOfView),
            gl.canvas.width / gl.canvas.height,
            0,
            1
        );
    }

    // Compute a matrix for the camera
    var cameraMatrix = m4.yRotation(cameraAngleRadians);
    cameraMatrix = m4.translate(cameraMatrix, 0, 0, 0);

    // Make a view matrix from the camera matrix.
    var viewMatrix = m4.inverse(cameraMatrix);

    // Compute a view projection matrix
    var matrix = m4.multiply(matrix, viewMatrix);

    matrix = m4.translate(matrix, translasi.x, translasi.y, translasi.z);
    matrix = m4.xRotate(matrix, degToRad(rotasi.x));
    matrix = m4.yRotate(matrix, degToRad(rotasi.y));
    matrix = m4.zRotate(matrix, degToRad(rotasi.z));

    gl.uniformMatrix4fv(matrixUniformLocation, false, matrix);

    // Draw the model here
    var model = hollowCube;
    for (var i = 0; i < model.position.length; i++) {
        setPositionColorBuffer(model.position[i], model.color[i]);
        gl.drawArrays(gl.TRIANGLE_FAN, 0, model.position[i].length / 3);
    }

    // window.requestAnimationFrame(drawScene);
}

function main() {
    // Scene drawer
    drawScene();
}

window.onload = main;
