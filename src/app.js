// -------- Initial Setup --------
// Get the canvas element
var canvas = document.getElementById("canvas");

// Create a WebGL context
var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

if (!gl) {
    alert("Your browser does not support WebGL");
}
// Setup GLSL program
// Program with shading
var program_with_shade = createProgram(
    gl,
    vertexShaderTextShading,
    fragmentShaderTextShading
);

// Program without shading
var program_no_shade = createProgram(gl, vertexShaderText, fragmentShaderText);

function drawScene() {
    var program = isShading ? program_with_shade : program_no_shade;

    // Get attribute and uniforms locations
    var positionAttribLocation = gl.getAttribLocation(program, "a_position");
    var colorAttribLocation = gl.getAttribLocation(program, "a_color");
    var normalAttribLocation = gl.getAttribLocation(program, "a_normal");
    var matrixUniformLocation = gl.getUniformLocation(program, "u_matrix");
    var colorUniformLocation = gl.getUniformLocation(program, "u_color");
    var reverseLightDirectionLocation = gl.getUniformLocation(
        program,
        "u_reverseLightDirection"
    );
    var worldViewProjectionLocation = gl.getUniformLocation(
        program,
        "u_worldViewProjection"
    );
    var worldInverseTransposeLocation = gl.getUniformLocation(
        program,
        "u_worldInverseTranspose"
    );

    // Create position buffer
    var positionBuffer = gl.createBuffer();

    // Create color buffer
    var colorBuffer = gl.createBuffer();

    // Create normal buffer
    var normalBuffer = gl.createBuffer();

    // Set the viewport
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Clear the canvas
    gl.clearColor(1, 1, 1, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Turn on culling. By default backfacing triangles
    // will be culled.
    gl.enable(gl.CULL_FACE);

    // Enable the depth buffer
    gl.enable(gl.DEPTH_TEST);

    // Use the program (shaders)
    gl.useProgram(program);

    // Compute the projection matrix
    var projectionMatrix = m4.orthographic(-1, 1, -1, 1, 1, -1);

    var perspectiveMatrix = m4.perspective(
        degToRad(fieldOfView),
        gl.canvas.width / gl.canvas.height,
        0,
        1
    );

    // Compute a matrix for the camera
    var cameraMatrix = m4.yRotation(cameraAngleRadians);
    cameraMatrix = m4.translate(cameraMatrix, 0, 0, 0);
    // Get the camera's position from the matrix we computed
    // var cameraPosition = [cameraMatrix[12], cameraMatrix[13], cameraMatrix[14]];
    // Compute the camera's matrix using look at.
    // cameraMatrix = m4.lookAt(cameraPosition, [0, 0, 1], [0, 1, 0]);

    // Compute a world matrix
    var worldMatrix = m4.yRotation(degToRad(rotasi.y));
    worldMatrix = m4.xRotate(worldMatrix, degToRad(rotasi.x));
    worldMatrix = m4.zRotate(worldMatrix, degToRad(rotasi.z));

    // Make a view matrix from the camera matrix.
    var viewMatrix = m4.inverse(cameraMatrix);

    // Compute a view projection matrix
    var viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);

    // Multiply the matrices.
    var worldViewProjectionMatrix = m4.multiply(
        viewProjectionMatrix,
        worldMatrix
    );
    var worldInverseMatrix = m4.inverse(worldMatrix);
    var worldInverseTransposeMatrix = m4.transpose(worldInverseMatrix);

    if (!isShading) {
        matrix = m4.orthographic(-1, 1, -1, 1, 1, -1);
        matrix = m4.translate(matrix, translasi.x, translasi.y, translasi.z);
        matrix = m4.xRotate(matrix, degToRad(rotasi.x));
        matrix = m4.yRotate(matrix, degToRad(rotasi.y));
        matrix = m4.zRotate(matrix, degToRad(rotasi.z));

        if (isPerspective) {
            matrix = m4.multiply(matrix, perspectiveMatrix);
        }

        // Set the matrix.
        gl.uniformMatrix4fv(matrixUniformLocation, false, matrix);
    } else {
        if (isPerspective) {
            worldViewProjectionMatrix = m4.multiply(
                worldViewProjectionMatrix,
                perspectiveMatrix
            );

            worldInverseTransposeMatrix = m4.multiply(
                worldInverseTransposeMatrix,
                perspectiveMatrix
            );
        }
    }

    // Set the matrices
    gl.uniformMatrix4fv(
        worldViewProjectionLocation,
        false,
        worldViewProjectionMatrix
    );
    gl.uniformMatrix4fv(
        worldInverseTransposeLocation,
        false,
        worldInverseTransposeMatrix
    );

    // Set the color to use
    gl.uniform4fv(colorUniformLocation, [0.2, 1, 0.2, 1]); // green

    // set the light direction.
    gl.uniform3fv(reverseLightDirectionLocation, m4.normalize([0.5, 0.7, 1]));

    // Draw the model here
    var model = hollowCube;
    for (var i = 0; i < model.position.length; i++) {
        // Set position buffer
        setBuffer(
            gl,
            positionBuffer,
            model.position[i],
            positionAttribLocation,
            3
        );

        if (isShading) {
            // Set normal buffer
            setBuffer(
                gl,
                normalBuffer,
                model.normal[i],
                normalAttribLocation,
                3
            );
        } else {
            // Set color buffer
            setBuffer(gl, colorBuffer, model.color[i], colorAttribLocation, 3);
        }

        gl.drawArrays(gl.TRIANGLE_FAN, 0, model.position[i].length / 3);
    }

    // window.requestAnimationFrame(drawScene);
}

function main() {
    // Scene drawer
    drawScene();
}

window.onload = main;
